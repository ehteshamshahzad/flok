import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateProviderInput } from './create-provider.input';

@InputType()
export class UpdateProviderInput extends PartialType(CreateProviderInput) {
  @Field(() => String)
  id: string;
}
