import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/base-entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Event } from './event.entity';

@Entity('event-review')
@ObjectType()
export class EventReview extends BaseEntity {
  @Column({ nullable: false, unique: false, length: 36 })
  @Field(() => String, { description: 'Id of the asscoaited Event' })
  eventId: string;

  @ManyToOne(() => Event, (event: Event) => event.eventReviews, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'eventId' })
  @Field({ nullable: true })
  event: Event;

  @Column({ nullable: false, unique: false, length: 36 })
  @Field(() => String, { description: 'Id of the user providing the review' })
  userId: string;

  @ManyToOne(() => User, (user: User) => user.eventReviews, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'userId' })
  @Field({ nullable: true })
  user: User;

  @Column({ nullable: false, unique: false })
  @Field(() => Number, { description: 'Event rating' })
  rating: number;

  @Column({ nullable: true, unique: false })
  @Field(() => String, { description: 'Event review' })
  review: string;
}
