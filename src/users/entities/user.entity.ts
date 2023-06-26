import { Field, ObjectType } from '@nestjs/graphql';
import { EventReview } from 'src/events/entities/event-review.entity';
import { EventWaitingList } from 'src/events/entities/event-waiting-list.entity';
import { FlaggedInappropriate } from 'src/events/entities/flagged-inappropriate.entity';
import { Child } from 'src/parents/entities/child.entity';
import { Contact } from 'src/parents/entities/contact.entity';
import { ProviderStaff } from 'src/providers/entities/provider-staff.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../base-entity';
import { AccountStatus } from './account-status.enum';
import { UserType } from './user-type.enum';

@Entity('user')
@ObjectType()
export class User extends BaseEntity {

  @Column({ nullable: false, unique: true, length: 100 })
  @Field({ nullable: false, description: `User's email` })
  email: string;

  @Column({ nullable: false, length: 50 })
  @Field({ nullable: false, description: `User's name` })
  name: string;

  @Column({ nullable: false })
  @Field({ nullable: false, description: `User's password` })
  password: string;

  @Column({ nullable: false, default: 'parent', length: 8 })
  @Field({ nullable: false, description: `User type: 'Parent' | 'Admin' | 'Provider'` })
  userType: UserType;

  @Column({ nullable: true })
  @Field({ nullable: true, description: `Profile Image URL` })
  profileImageURL: string;

  @Column({ nullable: true })
  @Field({ nullable: true, description: `Image Key` })
  profileImageKey: string;

  @Column({ nullable: true })
  @Field({ nullable: true, description: `Date of birth` })
  dateOfBirth: Date;

  @Column({ nullable: false, default: 'Unverified', length: 10 })
  @Field(() => AccountStatus, { nullable: false, description: `User's account status: 'Active' | 'Deleted' | 'Suspended' | 'Unverified'` })
  accountStatus: AccountStatus;

  @Column({ nullable: true, unique: false })
  @Field(() => Number, { description: 'User contact number', nullable: true })
  contactNumber: number;

  @Field(() => String, { description: 'Provider ID', nullable: true })
  @Column({ nullable: true, unique: false, length: 36 })
  providerStaffId: string;

  @Field(() => ProviderStaff, { description: 'Provider', nullable: true })
  @OneToOne(() => ProviderStaff, (providerStaff: ProviderStaff) => providerStaff.user, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'providerStaffId' })
  providerStaff: ProviderStaff;

  @OneToMany(() => FlaggedInappropriate, (flags: FlaggedInappropriate) => flags.user)
  flags: FlaggedInappropriate[];

  @OneToMany(() => EventWaitingList, (eventWaitingList: EventWaitingList) => eventWaitingList.user)
  eventWaitingList: EventWaitingList[];

  @OneToMany(() => EventReview, (eventReviews: EventReview) => eventReviews.user)
  eventReviews: EventReview[];

  @Field(() => [Child], { description: 'User children', nullable: true })
  @OneToMany(() => Child, (children: Child) => children.user)
  children: Child[];

  @Field(() => [Contact], { description: 'User contacts', nullable: true })
  @OneToMany(() => Contact, (contacts: Contact) => contacts.user)
  contacts: Contact[];
}
