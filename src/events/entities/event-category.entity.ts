import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/base-entity';
import { Category } from 'src/categories/entities/category.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Event } from './event.entity';

@Entity('event-category')
@ObjectType()
export class EventCategory extends BaseEntity {

    @Column({ nullable: false, unique: false, length: 36 })
    @Field(() => String, { description: 'Id of an event' })
    eventId: string;

    @ManyToOne(() => Event, (event: Event) => event.eventCategories, { createForeignKeyConstraints: false })
    @JoinColumn({ name: 'eventId' })
    @Field({ nullable: true })
    event: Event;

    @Column({ nullable: false, unique: false, length: 36 })
    @Field(() => String, { description: 'Id of the Category a Event belongs to' })
    categoryId: string;

    @ManyToOne(() => Category, (category: Category) => category.eventCategories, { createForeignKeyConstraints: false })
    @JoinColumn({ name: 'categoryId' })
    @Field({ nullable: true })
    category: Category;

}
