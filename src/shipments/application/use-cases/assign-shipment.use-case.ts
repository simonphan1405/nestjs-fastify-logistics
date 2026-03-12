import { Injectable, NotFoundException } from '@nestjs/common';
import { IShipmentRepository } from '../repositories/shipment.repository';

@Injectable()
export class AssignShipmentUseCase {
  constructor(private readonly shipmentRepo: IShipmentRepository) {}

  async execute(id: string, shipId: string) {
    const existing = await this.shipmentRepo.findById(id);
    if (!existing) {
      throw new NotFoundException(`Shipment with ID ${id} not found`);
    }
    return this.shipmentRepo.assignToShip(id, shipId);
  }
}
