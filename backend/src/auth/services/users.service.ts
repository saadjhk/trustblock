import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  saltOrRounds = 10;

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async newUser(email: string, password: string) {
    const newUser = this.userRepository.create({ email, password });
    await this.userRepository.save(newUser);
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return user;
  }

  async markEmailAsConfirmed(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    user.isVerifiedEmail = true;
    await this.userRepository.save(user);
  }

  async getUsers() {
    return this.userRepository.find({ take: 10 });
  }
}
