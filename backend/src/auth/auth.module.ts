import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { EmailConfirmationService } from './services/email-confirmation.service';
import { EmailConfirmationController } from './controllers/email-confirmation.controller';
import { EmailModule } from 'src/email/email.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule, EmailModule],
  controllers: [AuthController, EmailConfirmationController],
  providers: [UsersService, AuthService, EmailConfirmationService],
  exports: [],
})
export class AuthModule {}
