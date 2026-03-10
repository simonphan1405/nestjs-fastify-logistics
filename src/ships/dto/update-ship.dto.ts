import { PartialType } from '@nestjs/mapped-types';
import { CreateShipDto } from './create-ship.dto';

/**
 * DTO for updating a Ship.
 * Using PartialType makes all fields from CreateShipDto optional,
 * avoiding code duplication while maintaining validation rules.
 */
export class UpdateShipDto extends PartialType(CreateShipDto) {}
