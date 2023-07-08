import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { SignInUserDto } from 'src/dto/sign-in-user.dto';

@Injectable()
export class AuthService {
  saltOrRounds = 10;

  constructor(private readonly userService: UsersService) {}

  async registerUser(createUserDTO: CreateUserDto) {
    const user = await this.userService.getByEmail(createUserDTO.email);
    if (user) throw new BadRequestException('User email already exists');

    const password = createUserDTO.password;
    const hash = await bcrypt.hashSync(password, this.saltOrRounds);
    await this.userService.newUser(createUserDTO.email, hash);
  }

  async verifyLogin(userDto: SignInUserDto) {
    const user = await this.userService.getByEmail(userDto.email);
    const isRegistered = await bcrypt.compare(userDto.password, user.password);
    return { isRegistered, user };
  }
}
