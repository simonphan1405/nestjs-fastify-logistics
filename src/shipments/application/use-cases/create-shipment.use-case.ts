import { Injectable } from '@nestjs/common';
import { Shipment } from 'src/shipments/domain/entities/shipment.entity';
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
    const shipment = new Shipment(
      crypto.randomUUID(),
      cargoName,
      weight,
      originPortId,
      destinationPortId,
      '',
      'PENDING',
      new Date(),
      new Date(),
    );

    await this.shipmentRepo.save(shipment);

    return shipment;
  }
}
