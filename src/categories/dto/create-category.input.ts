import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @IsString()
  @MinLength(3)
  @Field({ nullable: false, description: `Name in English` })
  nameEN: string;

  @IsString()
  @MinLength(3)
  @Field({ nullable: false, description: `Name in French` })
  nameFR: string;

  @IsString()
  @MinLength(3)
  @Field({ nullable: false, description: `Name in German` })
  nameDE: string;

  @IsString()
  @MinLength(3)
  @Field({ nullable: false, description: `Name in Italian` })
  nameIT: string;
}
