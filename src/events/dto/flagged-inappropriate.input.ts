import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class FlaggedInappropriateInput {

    @IsUUID()
    @IsNotEmpty()
    @Field(() => String, { description: 'Id of event being flagged' })
    eventId: string;

    @IsString()
    @IsOptional()
    @Field(() => String, { description: 'Some description of why the event has been flagged', nullable: true })
    description: string;

}