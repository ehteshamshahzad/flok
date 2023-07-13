import { Field, ID, ObjectType } from '@nestjs/graphql';
import { isUUID } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@ObjectType()
export class BaseEntity {
  @PrimaryColumn({ length: 36 })
  @Field(() => ID, { nullable: false, description: 'Primary ID' })
  id: string;

  @CreateDateColumn({ nullable: true })
  @Field({ nullable: true, description: 'Created at Date' })
  createdAt: Date;

  @CreateDateColumn({ nullable: true })
  @Field({ nullable: true, description: 'Updated at Date' })
  updatedAt: Date;

  set setId(id: string) {
    if (isUUID(id)) {
      this.id = id;
      return;
    }
    this.id = uuidv4();
  }

  @BeforeInsert()
  updateCreatedAt() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  updateUpdatedAt() {
    this.updatedAt = new Date();
  }
}
