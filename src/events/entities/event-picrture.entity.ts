import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/base-entity';
import { Column, Entity } from 'typeorm';
import { Event } from './event.entity';

@Entity('event-picture')
@ObjectType()
export class EventPicture extends BaseEntity {

    @Column({ nullable: false, unique: false, length: 36 })
    @Field(() => Date, { description: 'Date and time of when the event will take place' })
    eventId: string;
    event: Event;

    @Column({ nullable: false, unique: false })
    @Field(() => String, { description: 'Id of Provider who is hosting this event' })
    imageURL: string;

    @Column({ nullable: false, unique: false })
    @Field(() => String, { description: 'Provider who is hosting this event', nullable: true })
    imageKey: string;

}
