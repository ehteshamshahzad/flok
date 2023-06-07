import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { RegisterUserInput } from './register-user.input';

@InputType()
export class UpdateUserInput extends PartialType(RegisterUserInput) {
  @Field(() => Int)
  id: number;
}
