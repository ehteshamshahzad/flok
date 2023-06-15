import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/base-entity';
import { Language } from 'src/language.enum';
import { Column, Entity } from 'typeorm';
import { Event } from './event.entity';

@Entity('event-multi-language')
@ObjectType()
export class EventMultiLangauge extends BaseEntity {

    @Column({ nullable: false, unique: false, length: 36 })
    @Field(() => String, { description: 'Id of the asscoaited Event' })
    eventId: string;
    event: Event;

    @Column({ nullable: false, unique: false, length: 100 })
    @Field(() => String, { description: 'Event title' })
    title: string;

    @Column({ nullable: false, unique: false })
    @Field(() => String, { description: 'Event description' })
    description: string;

    @Column({ nullable: false, unique: false, length: 15 })
    @Field(() => Language, { description: 'Event details for language: "English" | "Italian" | "French" | "German"' })
    language: Language;

}
