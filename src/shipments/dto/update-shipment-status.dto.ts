import { IsEnum } from 'class-validator';
import { ShipmentStatus } from 'generated/prisma/client';

export class UpdateShipmentStatusDto {
  @IsEnum(ShipmentStatus)
  status!: ShipmentStatus;
}
