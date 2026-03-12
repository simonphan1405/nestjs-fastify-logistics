import { Injectable } from '@nestjs/common';
import { IShipmentRepository } from '../repositories/shipment.repository';

@Injectable()
export class CreateShipmentUseCase {
  constructor(private readonly shipmentRepo: IShipmentRepository) {}

  async execute(
    cargoName: string,
    weight: number,
    originPortId: string,
    destinationPortId: string,
  ) {
    return this.shipmentRepo.create(cargoName, weight, originPortId, destinationPortId);
  }
}
