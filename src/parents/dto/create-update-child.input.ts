import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Gender } from '../entities/gender.enum';

@InputType()
export class CreateUpdateChildInput {

  @IsUUID()
  @IsOptional()
  @Field(() => String, { description: 'Id of the child', nullable: true })
  id?: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Name of the child', nullable: false })
  name: string;

  @IsDate()
  @Field(() => Date, { description: 'Child date of birth', nullable: false })
  dateOfBirth: Date;

  @IsEnum(Gender)
  @Field(() => Gender, { description: 'Gender of the child', nullable: false })
  gender: Gender;

}
