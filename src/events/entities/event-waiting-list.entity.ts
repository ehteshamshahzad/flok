import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/base-entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Event } from './event.entity';

@Entity('event-waiting-list')
@ObjectType()
export class EventWaitingList extends BaseEntity {
  @Column({ nullable: false, unique: false, length: 36 })
  @Field(() => Date, { description: 'Id of the associated event' })
  eventId: string;

  @ManyToOne(() => Event, (event: Event) => event.eventWaitingLists, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'eventId' })
  @Field({ nullable: true })
  event: Event;

  @Column({ nullable: false, unique: false, length: 36 })
  @Field(() => Date, {
    description: 'Id of user on the waiting list for a given event',
  })
  userId: string;

  @ManyToOne(() => User, (user: User) => user.eventWaitingList, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'userId' })
  @Field({ nullable: true })
  user: User;
}
