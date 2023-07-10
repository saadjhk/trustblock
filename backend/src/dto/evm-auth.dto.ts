import { IsNotEmpty, MinLength } from 'class-validator';

export class EvmAuthDto {
  @IsNotEmpty()
  @MinLength(8)
  message: string;

  @IsNotEmpty()
  @MinLength(1)
  signature: string;

  @IsNotEmpty()
  address: string;
}
