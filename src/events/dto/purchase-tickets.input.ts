import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

@InputType()
export class PurchaseTicketsInput {

    @IsUUID()
    @IsNotEmpty()
    @Field(() => String, { description: 'Event Id' })
    eventId: string;

    @IsNumber()
    @IsNotEmpty()
    @Field(() => Number, { description: 'Number of tickets to be bought' })
    numberOfTickets: number;


}
