import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Req,
  Get,
  Query,
  UseGuards,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import EventsService from '../services/events.service';
import { CreateEventDto } from 'src/dto/create-event.dto';
import { User } from 'src/entities';
import { AuthGuard } from 'src/auth/auth-guard';
import { UpdateEventDto } from 'src/dto/update-event.dto';

interface AuthenticatedRequest extends Request {
  user: User;
}

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('create')
  async create(
    @Req() request: AuthenticatedRequest,
    @Body() createEventDto: CreateEventDto,
  ) {
    const event = await this.eventsService.createEvent(
      request.user,
      createEventDto,
    );
    event.owner = undefined;
    event.isDeleted = undefined;

    return event;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Put('update/:id')
  async updateEvent(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: AuthenticatedRequest,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    const event = await this.eventsService.updateEvent(
      id,
      request.user,
      updateEventDto,
    );
    event.owner = undefined;
    event.isDeleted = undefined;
    return event;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('my-events')
  async myEvents(
    @Req() request: AuthenticatedRequest,
    @Query('page') page = 0,
  ) {
    const events = this.eventsService.getUserEventsPaginated(
      request.user,
      page,
    );
    return events;
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getEvents(@Query('page') page = 0) {
    return this.eventsService.getEventsPaginated(page);
  }
}
