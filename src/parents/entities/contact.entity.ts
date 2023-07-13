import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/base-entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('contact')
@ObjectType()
export class Contact extends BaseEntity {
  @Column({ unique: false, nullable: false, length: 50 })
  @Field(() => String, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  name: string;

  @Column({ unique: false, nullable: false, length: 100 })
  @Field(() => String, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  email: string;

  @Column({ unique: false, nullable: false, length: 36 })
  @Field(() => String, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  userId: string;

  @ManyToOne(() => User, (user: User) => user.contacts, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'userId' })
  @Field(() => User, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  user: User;
}
