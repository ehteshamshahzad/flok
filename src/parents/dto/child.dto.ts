import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChildDto {
  @Field(() => String)
  id: string;
}
