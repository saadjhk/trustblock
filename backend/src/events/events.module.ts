import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/auth/controllers/auth.controller';
import { EmailConfirmationController } from 'src/auth/controllers/email-confirmation.controller';
import { AuthService } from 'src/auth/services/auth.service';
import { EmailConfirmationService } from 'src/auth/services/email-confirmation.service';
import { UsersService } from 'src/auth/services/users.service';
import { EmailModule } from 'src/email/email.module';
import { User } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule, EmailModule],
  controllers: [AuthController, EmailConfirmationController],
  providers: [UsersService, AuthService, EmailConfirmationService],
  exports: [],
})
export class EventsModule {}
