import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Event } from './event.entity';

@Entity('recurring-event')
@ObjectType()
export class RecurringEvent extends BaseEntity {

    @Column({ nullable: false, unique: false, length: 36 })
    @Field(() => String, { description: 'Id of the recuring event' })
    eventId: string;

    @ManyToOne(() => Event, (event: Event) => event.recurringEvents, { createForeignKeyConstraints: false })
    @JoinColumn({ name: 'eventId' })
    @Field({ nullable: true })
    event: Event;

    @Column({ nullable: false, unique: false })
    @Field(() => String, { description: 'Id of the user flagging the event' })
    date: Date;
}
