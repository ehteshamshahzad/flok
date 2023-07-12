import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ImageKeyDto {
  @Field(() => String)
  key: string;
}
