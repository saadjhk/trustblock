import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  MinLength,
} from 'class-validator';
import { EventCities } from 'src/events/types';

export class UpdateEventDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @MinLength(8)
  name: string;

  @IsNotEmpty()
  @MinLength(8)
  description: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsEnum(EventCities)
  city: EventCities;
}
