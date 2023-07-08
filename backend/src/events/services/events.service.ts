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

  async updateEvent(id: number, user: User, updateEventDto: UpdateEventDto) {
    const event = await this.eventsRepository.findOne({
      where: { id: id, owner: user },
    });

    event.city = updateEventDto.city ?? event.city;
    event.date = updateEventDto.date ?? event.date;
    event.description = updateEventDto.description ?? event.description;
    event.name = updateEventDto.name ?? event.name;
    await this.eventsRepository.save(event);
    return event;
  }

  async deleteEvent(eventId: number, user: User) {
    await this.eventsRepository.update(
      {
        id: eventId,
        owner: user,
      },
      { isDeleted: true },
    );
  }

  async getEventsPaginated(page = 1, take = 10) {
    return this.eventsRepository.find({
      where: { isDeleted: false },
      order: { date: 'ASC' },
      take,
      skip: (page - 1) * take,
    });
  }

  async getUserEventsPaginated(user: User, page = 1, take = 10) {
    return this.eventsRepository.find({
      where: { owner: user, isDeleted: false },
      take,
      skip: (page - 1) * take,
    });
  }
}
