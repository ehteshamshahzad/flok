import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { UserInput } from './user.dto';

@InputType()
export class UpdateUserInput extends PartialType(UserInput) {
  @Field(() => Int)
  id: number;
}
