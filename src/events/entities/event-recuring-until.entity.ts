import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/base-entity';
import { Column, Entity } from 'typeorm';
import { Event } from './event.entity';

@Entity('recurring-event')
@ObjectType()
export class RecurringEvent extends BaseEntity {

    @Column({ nullable: false, unique: false, length: 36 })
    @Field(() => String, { description: 'Id of the recuring event' })
    eventId: string;
    event: Event;

    @Column({ nullable: false, unique: false })
    @Field(() => String, { description: 'Id of the user flagging the event' })
    date: Date;
}
