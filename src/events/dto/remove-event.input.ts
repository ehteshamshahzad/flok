import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class RemoveEventInput {
  @IsUUID()
  @IsNotEmpty()
  @Field(() => String, { description: 'Id of event being flagged' })
  eventId: string;

  @IsUUID()
  @IsNotEmpty()
  @Field(() => String, { description: 'Id of provider/organisation' })
  providerId: string;
}
