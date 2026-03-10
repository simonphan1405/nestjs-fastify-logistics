import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePortDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  country: string;
}
