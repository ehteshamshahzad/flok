import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateProviderInput {

  @IsString()
  @MinLength(3)
  @Field(() => String, { description: 'Name of Provider' })
  name: string;

  @IsString()
  @MinLength(3)
  @Field(() => String, { description: 'Title name of Provider' })
  titleName: string;

  @IsEmail()
  @Field(() => String, { description: 'Email of Provider' })
  email: string;

  @IsNumber()
  @IsOptional()
  @Field(() => Number, { description: 'Template number', nullable: true, defaultValue: 1 })
  pageTemplate: number;
}
