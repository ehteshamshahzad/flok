import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

@InputType()
export class CreateTicketInput {

  @IsUUID()
  @IsNotEmpty()
  @Field(() => String, { description: 'Example field (placeholder)' })
  eventId: string;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number, { description: 'Example field (placeholder)' })
  price: number;
}
