import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';
import { EventCities } from 'src/events/types';

export class UpdateEventDto {
  @IsNotEmpty()
  @MinLength(8)
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  @IsOptional()
  date: Date;

  @IsNotEmpty()
  @IsEnum(EventCities)
  @IsOptional()
  city: EventCities;
}
