import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { AssignShipmentDto } from './dto/assign-shipment.dto';
import { UpdateShipmentStatusDto } from './dto/update-shipment-status.dto';
import { DatabaseService } from 'src/database/database.service';
import { ShipmentStatus } from 'generated/prisma/client';

@Injectable()
export class ShipmentsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createShipmentDto: CreateShipmentDto) {
    return this.databaseService.shipment.create({
      data: {
        ...createShipmentDto,
        status: ShipmentStatus.PENDING,
      },
    });
  }

  async findAll() {
    return this.databaseService.shipment.findMany();
  }

  async assignToShip(id: string, assignShipmentDto: AssignShipmentDto) {
    await this.findOne(id);
    return this.databaseService.shipment.update({
      where: { id },
      data: {
        shipId: assignShipmentDto.shipId,
        status: ShipmentStatus.LOADING,
      },
    });
  }

  async getShipmentsOfShip(shipId: string) {
    return this.databaseService.shipment.findMany({
      where: { shipId },
    });
  }

  async updateStatus(
    id: string,
    updateShipmentStatusDto: UpdateShipmentStatusDto,
  ) {
    await this.findOne(id);
    return this.databaseService.shipment.update({
      where: { id },
      data: {
        status: updateShipmentStatusDto.status,
      },
    });
  }

  async findOne(id: string) {
    const shipment = await this.databaseService.shipment.findUnique({
      where: { id },
    });
    if (!shipment) {
      throw new NotFoundException(`Shipment with ID ${id} not found`);
    }
    return shipment;
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.databaseService.shipment.delete({
      where: { id },
    });
  }
}
