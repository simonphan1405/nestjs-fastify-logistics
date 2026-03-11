import { IsNotEmpty, IsString } from 'class-validator';
import { ShipmentCreateInput } from '../../../generated/prisma/models/Shipment';

export class AssignShipmentDto implements Pick<ShipmentCreateInput, 'shipId'> {
  @IsString()
  @IsNotEmpty()
  shipId!: string;
}
