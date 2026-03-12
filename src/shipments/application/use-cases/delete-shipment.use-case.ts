import { Injectable, NotFoundException } from '@nestjs/common';
import { IShipmentRepository } from '../repositories/shipment.repository';

@Injectable()
export class DeleteShipmentUseCase {
  constructor(private readonly shipmentRepo: IShipmentRepository) {}

  async execute(id: string) {
    const existing = await this.shipmentRepo.findById(id);
    if (!existing) {
      throw new NotFoundException(`Shipment with ID ${id} not found`);
    }
    await this.shipmentRepo.delete(id);
  }
}
