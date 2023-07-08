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
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule, EmailModule],
  controllers: [AuthController, EmailConfirmationController, UsersController],
  providers: [UsersService, AuthService, EmailConfirmationService],
  exports: [UsersService, AuthService],
})
export class AuthModule {}
