import { Injectable } from '@nestjs/common';
import { Shipment as PrismaShipment } from 'generated/prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { IShipmentRepository } from 'src/shipments/application/repositories/shipment.repository';
import {
  Shipment,
  ShipmentStatus,
} from 'src/shipments/domain/entities/shipment.entity';

@Injectable()
export class PrismaShipmentRepository implements IShipmentRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  private toDomain(row: PrismaShipment): Shipment {
    return new Shipment(
      row.id,
      row.cargoName,
      row.weight,
      row.originPortId,
      row.destinationPortId,
      row.shipId ?? '',
      row.status as ShipmentStatus,
      row.createdAt,
      row.updatedAt,
    );
  }

  async create(
    cargoName: string,
    weight: number,
    originPortId: string,
    destinationPortId: string,
  ): Promise<Shipment> {
    const row = await this.databaseService.shipment.create({
      data: { cargoName, weight, originPortId, destinationPortId, status: 'PENDING' },
    });
    return this.toDomain(row);
  }

  async findAll(): Promise<Shipment[]> {
    const rows = await this.databaseService.shipment.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async findById(id: string): Promise<Shipment | null> {
    const row = await this.databaseService.shipment.findUnique({
      where: { id },
    });
    return row ? this.toDomain(row) : null;
  }

  async findByShipId(shipId: string): Promise<Shipment[]> {
    const rows = await this.databaseService.shipment.findMany({
      where: { shipId },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async assignToShip(id: string, shipId: string): Promise<Shipment> {
    const row = await this.databaseService.shipment.update({
      where: { id },
      data: { shipId, status: 'LOADING' },
    });
    return this.toDomain(row);
  }

  async updateStatus(id: string, status: ShipmentStatus): Promise<Shipment> {
    const row = await this.databaseService.shipment.update({
      where: { id },
      data: { status },
    });
    return this.toDomain(row);
  }

  async delete(id: string): Promise<void> {
    await this.databaseService.shipment.delete({ where: { id } });
  }
}
