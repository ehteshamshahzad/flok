import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateUpdateContactInput {

    @IsUUID()
    @IsOptional()
    @Field(() => String, { description: 'Id of the child', nullable: true })
    id?: string;

    @IsString()
    @Field(() => String, { description: 'Name of the child', nullable: false })
    name: string;

    @IsString()
    @IsEmail()
    @Field(() => String, { description: 'Name of the child', nullable: false })
    email: string;
}
