import { IsNotEmpty, IsString } from 'class-validator';

export class AssignShipmentDto {
  @IsString()
  @IsNotEmpty()
  shipId: string;
}
