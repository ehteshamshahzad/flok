import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RegisterUserResponseDto {
  @Field({ description: 'User email' })
  email: string;

  @Field({ description: 'User name' })
  name: string;
}
