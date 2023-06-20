import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/base-entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity } from 'typeorm';
import { Event } from './event.entity';

@Entity('event-review')
@ObjectType()
export class EventReview extends BaseEntity {

    @Column({ nullable: false, unique: false, length: 36 })
    @Field(() => String, { description: 'Id of the asscoaited Event' })
    eventId: string;
    event: Event;

    @Column({ nullable: false, unique: false, length: 36 })
    @Field(() => String, { description: 'Id of the user providing the review' })
    userId: string;
    user: User;

    @Column({ nullable: false, unique: false })
    @Field(() => Number, { description: 'Event rating' })
    rating: number;

    @Column({ nullable: true, unique: false })
    @Field(() => String, { description: 'Event review' })
    review: string;

}
