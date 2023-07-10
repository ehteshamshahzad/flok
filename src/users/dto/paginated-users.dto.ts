import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserType } from '../entities/user-type.enum';
import { User } from '../entities/user.entity';
import { Ticket } from 'src/events/entities/ticket.entity';
import { Contact } from 'src/parents/entities/contact.entity';
import { Child } from 'src/parents/entities/child.entity';
import { EventReview } from 'src/events/entities/event-review.entity';
import { EventWaitingList } from 'src/events/entities/event-waiting-list.entity';

@ObjectType()
export class PaginatedParentsDto {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  totalItems: number;

  @Field(() => [ParentDto])
  items: ParentDto[];
}

@ObjectType()
export class ParentDto {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => UserType)
  userType: UserType;

  @Field(() => String, { nullable: true })
  profileImageURL: string;

  @Field(() => String, { nullable: true })
  profileImageKey: string;

  @Field(() => Date, { nullable: true })
  dateOfBirth: Date;

  @Field(() => Number, { nullable: true })
  contactNumber: number;

  @Field(() => [EventWaitingList])
  eventWaitingList: EventWaitingList[];

  @Field(() => [EventReview])
  eventReviews: EventReview[];

  @Field(() => [Child])
  children: Child[];

  @Field(() => [Contact])
  contacts: Contact[];

  @Field(() => [Ticket])
  tickets: Ticket[];
}
