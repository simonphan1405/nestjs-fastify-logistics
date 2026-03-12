import { Injectable } from '@nestjs/common';
import { IShipmentRepository } from '../repositories/shipment.repository';

@Injectable()
export class GetShipmentsByShipUseCase {
  constructor(private readonly shipmentRepo: IShipmentRepository) {}

  async execute(shipId: string) {
    return this.shipmentRepo.findByShipId(shipId);
  }
}
