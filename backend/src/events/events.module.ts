import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './controllers/events.controller';
import { Event } from 'src/entities/event.entity';
import { AuthModule } from 'src/auth/auth.module';
import EventsService from './services/events.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), JwtModule, AuthModule],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [],
})
export class EventsModule {}
