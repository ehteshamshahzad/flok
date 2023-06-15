import { Field, ObjectType } from '@nestjs/graphql';
import { ProviderStaff } from 'src/providers/entities/provider-staff.entity';
import { Column, Entity, OneToMany } from 'typeorm';
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

  @OneToMany(() => ProviderStaff, (providerStaff: ProviderStaff) => providerStaff.user)
  providerStaff: ProviderStaff[];

}
