import { BaseEntity } from 'src/common/domain/base.entity';

export type ShipmentStatus = 'PENDING' | 'LOADING' | 'SAILING' | 'DELIVERED';

export class Shipment extends BaseEntity {
  constructor(
    id: string,
    public cargoName: string,
    public weight: number,
    public originPortId: string,
    public destinationPortId: string,
    public shipId: string,
    public status: ShipmentStatus,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, createdAt, updatedAt);
  }
}
