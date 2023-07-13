import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/base-entity';
import { EventCategory } from 'src/events/entities/event-category.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('category')
@ObjectType()
export class Category extends BaseEntity {
  @Field({ nullable: false, description: `Name in English` })
  @Column({ nullable: false, unique: true, length: 60 })
  nameEN: string;

  @Field({ nullable: true, description: `Name in French` })
  @Column({ nullable: true, unique: false, length: 60 })
  nameFR: string;

  @Field({ nullable: true, description: `Name in German` })
  @Column({ nullable: true, unique: false, length: 60 })
  nameDE: string;

  @Field({ nullable: true, description: `Name in Italian` })
  @Column({ nullable: true, unique: false, length: 60 })
  nameIT: string;

  @OneToMany(
    () => EventCategory,
    (eventCategorys: EventCategory) => eventCategorys.category
  )
  eventCategories: EventCategory[];
}
