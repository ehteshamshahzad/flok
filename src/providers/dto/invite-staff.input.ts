import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class InviteStaffInput {
  @IsUUID()
  @Field({ description: 'Provider ID' })
  providerId: string;

  @IsEmail()
  @Field({ description: 'User email' })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.toLowerCase() : value
  )
  email: string;

  @IsString()
  @IsNotEmpty()
  @Field({ description: 'User name' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  name: string;
}
