import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

@InputType()
export class EventReviewInput {

    @IsUUID()
    @IsNotEmpty()
    @Field(() => String, { description: 'Id of event being flagged' })
    eventId: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(10)
    @Field(() => Number, { description: 'Event rating ' })
    rating: number;

    @IsString()
    @IsOptional()
    @Field(() => String, { description: 'Some description of why the event has been flagged' })
    review: string;

}