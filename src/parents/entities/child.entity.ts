import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/base-entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Gender } from './gender.enum';

@Entity('child')
@ObjectType()
export class Child extends BaseEntity {

  @Column({ unique: false, nullable: false, length: 50 })
  @Field(() => String, { description: 'Name of the child', nullable: true })
  name: string;

  @Column({ unique: false, nullable: false })
  @Field(() => Date, { description: 'Child date of birth', nullable: true })
  dateOfBirth: Date;

  @Column({ unique: false, nullable: false })
  @Field(() => Gender, { description: 'Gender of the child', nullable: true })
  gender: Gender;

  @Column({ unique: false, nullable: false, length: 36 })
  @Field(() => String, { description: 'Parent user id', nullable: true })
  userId: string;

  @ManyToOne(() => User, (user: User) => user.children, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'userId' })
  @Field(() => User, { description: 'Parent user', nullable: true })
  user: User;

  @Column({ unique: false, nullable: true })
  @Field(() => String, { description: 'Child image URL', nullable: true })
  profileImageURL: string;

  @Column({ unique: false, nullable: true })
  @Field(() => String, { description: 'Child image key', nullable: true })
  profileImageKey: string;
}
