import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/base-entity';
import { Category } from 'src/categories/entities/category.entity';
import { Column, Entity } from 'typeorm';
import { Event } from './event.entity';

@Entity('event-category')
@ObjectType()
export class EventCategory extends BaseEntity {

    @Column({ nullable: false, unique: false, length: 36 })
    @Field(() => String, { description: 'Id of an event' })
    eventId: string;
    event: Event;

    @Column({ nullable: false, unique: false, length: 36 })
    @Field(() => String, { description: 'Id of the Category a Event belongs to' })
    categoryId: string;
    category: Category;

}
