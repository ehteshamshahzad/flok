import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/base-entity';
import { Provider } from 'src/providers/entities/provider.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { EventCategory } from './event-category.entity';
import { EventMultiLangauge } from './event-multi-langauge.entity';
import { EventPicture } from './event-picrture.entity';
import { RecurringEvent } from './event-recuring-until.entity';
import { EventReview } from './event-review.entity';
import { EventStatus } from './event-status.enum';
import { EventWaitingList } from './event-waiting-list.entity';
import { FlaggedInappropriate } from './flagged-inappropriate.entity';

@Entity('event')
@ObjectType()
export class Event extends BaseEntity {

  // @Column({ nullable: false, unique: false })
  // @Field(() => Date, { description: 'Date and time of when the event will take place' })
  // dateTime: Date;

  @Column({ nullable: false, unique: false, length: 36 })
  @Field(() => String, { description: 'Id of Provider who is hosting this event' })
  providerId: string;
  provider: Provider;

  // @Field(() => String, { description: 'Currency' })
  // currency:string;

  // @Field(() => String, { description: 'Price of the ticket' })
  // price:number;

  @Column({ nullable: true })
  @Field(() => String, { description: 'Banner Image URL', nullable: true })
  bannerImageURL: string;

  @Column({ nullable: true })
  @Field(() => String, { description: 'Banner Image Key', nullable: true })
  bannerImageKey: string;

  @Column({ nullable: false, unique: false })
  @Field(() => String, { description: 'Location of the Event taking place' })
  location: string;

  @Column({ nullable: false, unique: false, length: 12 })
  @Field(() => String, { description: 'Latitude' })
  latitude: string;

  @Column({ nullable: false, unique: false, length: 13 })
  @Field(() => String, { description: 'Longitude' })
  longitude: string;

  @Column({ nullable: false, unique: false })
  @Field(() => String, { description: 'Minimum age required' })
  minAge: number;

  @Column({ nullable: false, unique: false })
  @Field(() => String, { description: 'Maximum age allowed' })
  maxAge: number;

  // @Field(() => String, { description: 'Total number of capacity for an event' })
  // capacity: number;

  // @Column({ nullable: false, unique: false })
  // @Field(() => String, { description: '', nullable: true })
  // recurringUntil: Date;

  @Column({ nullable: false, unique: false })
  @Field(() => String, { description: 'Last date to register for a given event' })
  registrationDeadline: Date;

  @Column({ nullable: false, unique: false, default: EventStatus.DRAFT })
  @Field(() => String, { description: 'Current status of the event: "Draft" | "Published" | "Archive" | "Private" | "Deleted"' })
  status: EventStatus;

  // @Column({ nullable: false, unique: false, length: 36 })
  // @Field(() => String, { description: 'Id of the category said event belongs to' })
  // categoryId: string;

  @OneToMany(() => EventPicture, (eventPictures: EventPicture) => eventPictures.event)
  @Field(() => [EventPicture], { description: 'List of event pictures' })
  eventPictures: EventPicture[];

  @OneToMany(() => EventMultiLangauge, (eventMultiLangauges: EventMultiLangauge) => eventMultiLangauges.event)
  @Field(() => [EventMultiLangauge], { description: 'List of event details in different languages' })
  eventMultiLanguages: EventMultiLangauge[];

  @OneToMany(() => EventReview, (eventReviews: EventReview) => eventReviews.event)
  @Field(() => [EventReview], { nullable: true, description: 'Event reviews' })
  eventReviews: EventReview[];

  @OneToMany(() => EventWaitingList, (eventWaitingList: EventWaitingList) => eventWaitingList.event)
  @Field(() => [EventWaitingList], { nullable: true, description: 'Waiting list of an event' })
  eventWaitingLists: EventWaitingList[];

  @OneToMany(() => FlaggedInappropriate, (flags: FlaggedInappropriate) => flags.event)
  @Field(() => [FlaggedInappropriate], { nullable: true, description: 'Complaints against an event' })
  flags: FlaggedInappropriate[];

  @OneToMany(() => RecurringEvent, (recurringEvents: RecurringEvent) => recurringEvents.event)
  @Field(() => [RecurringEvent], { description: 'Event recurring date' })
  recurringEvents: RecurringEvent[];

  @OneToMany(() => EventCategory, (eventCategories: EventCategory) => eventCategories.event)
  @Field(() => [EventCategory], { description: 'List of categories an event belongs to' })
  eventCategories: EventCategory[];
}