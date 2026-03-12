import { Injectable, NotFoundException } from '@nestjs/common';
import { IShipmentRepository } from '../repositories/shipment.repository';

@Injectable()
export class GetShipmentByIdUseCase {
  constructor(private readonly shipmentRepo: IShipmentRepository) {}

  async execute(id: string) {
    const shipment = await this.shipmentRepo.findById(id);
    if (!shipment) {
      throw new NotFoundException(`Shipment with ID ${id} not found`);
    }
    return shipment;
  }
}
