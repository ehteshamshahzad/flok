import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { UserDto } from 'src/users/dto/user.input';

@ObjectType()
export class LoginUserResponse extends PartialType(UserDto) {
  @Field({ description: 'User JWT token' })
  accessToken: string;
}
