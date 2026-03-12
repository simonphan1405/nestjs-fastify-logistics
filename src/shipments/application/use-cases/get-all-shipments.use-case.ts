import { Injectable } from '@nestjs/common';
import { IShipmentRepository } from '../repositories/shipment.repository';

@Injectable()
export class GetAllShipmentsUseCase {
  constructor(private readonly shipmentRepo: IShipmentRepository) {}

  async execute() {
    return this.shipmentRepo.findAll();
  }
}
