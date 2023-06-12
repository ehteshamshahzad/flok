import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserType } from 'src/users/entities/user-type.enum';

@InputType()
export class RegisterUserInput {

  @IsEmail()
  @Field({ description: 'User email' })
  @Transform(({ value }) => typeof value === 'string' ? value.toLowerCase() : value)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Field({ description: 'User name' })
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  name: string;

  @IsString()
  @MinLength(8)
  @Field({ description: 'User password' })
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  password: string;

  @IsString()
  @MinLength(8)
  @Field({ description: 'User confirmPassword' })
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  confirmPassword: string;

  @IsNotEmpty()
  @IsEnum(UserType)
  @Field({ description: 'User type: "Parent" | "Admin" | "Provider"' })
  userType: UserType;

}