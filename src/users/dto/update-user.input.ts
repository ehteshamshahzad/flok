import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  name: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  dateOfBirth?: Date;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  profileImageURL?: string;

}
