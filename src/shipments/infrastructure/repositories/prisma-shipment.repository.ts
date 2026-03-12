import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { IShipmentRepository } from 'src/shipments/application/repositories/shipment.repository';
import { Shipment } from 'src/shipments/domain/entities/shipment.entity';

@Injectable()
export class PrismaShipmentRepository implements IShipmentRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async save(shipment: Shipment): Promise<void> {
    await this.databaseService.shipment.create({
      data: {
        cargoName: shipment.cargoName,
        weight: shipment.weight,
        originPortId: shipment.originPortId,
        destinationPortId: shipment.destinationPortId,
        status: shipment.status,
      },
    });
  }
}
