import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateShipmentDto {
  @IsString()
  @IsNotEmpty()
  cargoName: string;

  @IsNumber()
  @Min(0.1)
  weight: number;

  @IsString()
  @IsNotEmpty()
  originPortId: string;

  @IsString()
  @IsNotEmpty()
  destinationPortId: string;
}
