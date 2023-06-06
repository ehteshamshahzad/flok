import { Field, ObjectType } from '@nestjs/graphql';
import { isEmail } from 'class-validator';
import { BaseEntity } from 'src/base-entity';
import { Column, Entity, Index } from 'typeorm';

@Entity('user')
@ObjectType()
export class User extends BaseEntity {

  @Column({ name: 'email', nullable: false, unique: true, length: 100 })
  @Field({ name: 'email', nullable: false, description: 'email' })
  @Index()
  private _email: string;

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    if (!isEmail(email)) {
      throw Error('Invalid email');
    }
    email = email.toLowerCase();
    this._email = email;
  }
}
