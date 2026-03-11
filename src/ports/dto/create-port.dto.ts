import { IsNotEmpty, IsString } from 'class-validator';
import { PortCreateInput } from '../../../generated/prisma/models/Port';

export class CreatePortDto implements Omit<PortCreateInput, 'id' | 'createdAt' | 'updatedAt'> {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  country!: string;
}
