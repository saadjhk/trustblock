import { EventCities } from 'src/events/types';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  description: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  date: Date;

  @Column({
    nullable: false,
  })
  city: EventCities;

  @Column({
    default: false,
    select: false,
  })
  isDeleted: boolean;

  @ManyToOne(() => User)
  @JoinColumn()
  owner: User;
}
