import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/base-entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity } from 'typeorm';
import { Event } from './event.entity';

@Entity('flagged-inappropriate')
@ObjectType()
export class FlaggedInappropriate extends BaseEntity {
  @Column({ nullable: false, unique: false, length: 36 })
  @Field(() => String, { description: 'Id of the flagged event' })
  eventId: string;
  event: Event;

  @Column({ nullable: false, unique: false, length: 36 })
  @Field(() => String, { description: 'Id of the user flagging the event' })
  userId: string;
  user: User;

  @Column({ nullable: true, unique: false })
  @Field(() => String, {
    description: 'Some description of why a user is flagging the event',
    nullable: true,
  })
  description: string;
}
