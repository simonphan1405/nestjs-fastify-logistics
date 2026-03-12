import { Injectable, NotFoundException } from '@nestjs/common';
import { ShipmentStatus } from 'src/shipments/domain/entities/shipment.entity';
import { IShipmentRepository } from '../repositories/shipment.repository';

@Injectable()
export class UpdateShipmentStatusUseCase {
  constructor(private readonly shipmentRepo: IShipmentRepository) {}

  async execute(id: string, status: ShipmentStatus) {
    const existing = await this.shipmentRepo.findById(id);
    if (!existing) {
      throw new NotFoundException(`Shipment with ID ${id} not found`);
    }
    return this.shipmentRepo.updateStatus(id, status);
  }
}
