import { Field, InputType } from '@nestjs/graphql';
import { IsDataURI, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

@InputType()
export class SearchEventInput {

    @IsUUID()
    @IsOptional()
    @Field(() => String, { description: 'Id of provider hosting the event', nullable: true })
    providerId: string;

    @IsString()
    @IsOptional()
    @Field(() => String, { description: 'Event name', nullable: true })
    eventName: string;

    @IsDataURI()
    @IsOptional()
    @Field(() => Date, { description: 'Events from date', nullable: true })
    fromDate: Date;

    @IsDataURI()
    @IsOptional()
    @Field(() => Date, { description: 'Events to date', nullable: true })
    toDate: Date;

    @IsString()
    @IsOptional()
    @MaxLength(13)
    @Field(() => String, { description: 'Longitude of events', nullable: true })
    longitude: string;

    @IsString()
    @IsOptional()
    @MaxLength(12)
    @Field(() => String, { description: 'Latitude of events', nullable: true })
    latitude: string;

    @IsUUID()
    @IsOptional()
    @Field(() => String, { description: 'Events belonging to a category', nullable: true })
    categoryId: string;

}