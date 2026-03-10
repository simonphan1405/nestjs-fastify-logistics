import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { ShipStatus } from '../entities/ship.entity';

/**
 * DTO (Data Transfer Object) for creating a Ship.
 * Uses class-validator decorators to ensure incoming request payload is valid.
 * This works natively with the global ValidationPipe we set up in main.ts.
 */
export class CreateShipDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  captain: string;

  @IsInt()
  @Min(1)
  capacity: number;

  @IsEnum(ShipStatus)
  status: ShipStatus;
}
