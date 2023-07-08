import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from 'src/entities/event.entity';
import { CreateEventDto } from 'src/dto/create-event.dto';
import { User } from 'src/entities';
import { UpdateEventDto } from 'src/dto/update-event.dto';

@Injectable()
export default class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
  ) {}

  async createEvent(user: User, createEventDto: CreateEventDto) {
    const event = await this.eventsRepository.create(createEventDto);
    event.owner = user;
    await this.eventsRepository.save(event);
    return event;
  }

  async updateEvent(updateEventDto: UpdateEventDto) {
    const event = await this.eventsRepository.findOne({
      where: { id: updateEventDto.id },
    });

    event.city = updateEventDto.city;
    event.date = updateEventDto.date;
    event.description = updateEventDto.description;
    event.name = updateEventDto.name;
    await this.eventsRepository.save(event);
  }

  async deleteEvent(eventId: number) {
    await this.eventsRepository.update(
      {
        id: eventId,
      },
      { isDeleted: true },
    );
  }

  async getEventsPaginated(skip: number, take = 10) {
    return this.eventsRepository.find({ take, skip });
  }

  async getUserEventsPaginated(user: User, skip: number, take = 10) {
    return this.eventsRepository.find({ where: { owner: user }, take, skip });
  }
}
