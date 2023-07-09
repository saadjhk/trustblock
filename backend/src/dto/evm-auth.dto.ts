import { Transform } from 'class-transformer';
import { IsNotEmpty, MinLength } from 'class-validator';

export class EvmAuthDto {
  @IsNotEmpty()
  @MinLength(8)
  message: string;

  @IsNotEmpty()
  @MinLength(1)
  signature: string;

  @IsNotEmpty()
  @Transform((param) => param.value.toLowerCase())
  address: string;
}
