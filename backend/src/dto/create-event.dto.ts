import { IsDateString, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { EventCities } from 'src/events/types';

export class CreateEventDto {
  @IsNotEmpty()
  @MinLength(8)
  name: string;

  @IsNotEmpty()
  @MinLength(8)
  description: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsEnum(EventCities)
  city: EventCities;
}
