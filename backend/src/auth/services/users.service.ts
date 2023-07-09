import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EvmAuthDto } from 'src/dto/evm-auth.dto';
import { User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  saltOrRounds = 10;

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async newEmailUser(email: string, password: string) {
    const newUser = this.userRepository.create({ email, password });
    await this.userRepository.save(newUser);
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return user;
  }

  async getByAddressOrEmail(email: string, evmAddress: string) {
    const user = await this.userRepository.findOne({
      where: { email, evmAddress },
    });

    return user;
  }

  async getByAddress(address: string) {
    const user = await this.userRepository.findOne({
      where: { evmAddress: address },
    });

    return user;
  }

  async markEmailAsConfirmed(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    user.isVerifiedEmail = true;
    await this.userRepository.save(user);
  }

  async newEvmUser(evmLoginDto: EvmAuthDto) {
    const newUser = this.userRepository.create({
      email: '',
      password: '',
      evmAddress: evmLoginDto.address,
      isVerifiedEmail: true,
    });
    await this.userRepository.save(newUser);
    return newUser;
  }
}
