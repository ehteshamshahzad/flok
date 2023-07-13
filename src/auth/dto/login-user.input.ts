import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class LoginUserInput {
  @IsEmail()
  @Field({ description: 'User email' })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.toLowerCase() : value
  )
  email: string;

  @IsString()
  @MinLength(8)
  @Field({ description: 'User password' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  password: string;
}
