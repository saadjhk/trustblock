import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignInUserDto {
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
