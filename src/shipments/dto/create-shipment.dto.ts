import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ShipmentCreateInput } from 'generated/prisma/models/Shipment';

export class CreateShipmentDto implements Pick<ShipmentCreateInput, 'cargoName' | 'weight'> {
  @IsString()
  @IsNotEmpty()
  cargoName!: string;

  @IsNumber()
  @Min(0.1)
  weight!: number;

  @IsString()
  @IsNotEmpty()
  originPortId!: string;

  @IsString()
  @IsNotEmpty()
  destinationPortId!: string;
}
