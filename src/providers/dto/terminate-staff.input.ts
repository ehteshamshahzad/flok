import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class TerminateStaffInput {
  @IsUUID()
  @Field({ description: 'Provider ID' })
  providerId: string;

  @IsUUID()
  @Field({ description: 'Id of staff member to be terminated' })
  staffId: string;
}
