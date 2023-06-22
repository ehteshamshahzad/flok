import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID, MaxLength, Min, ValidateNested } from 'class-validator';
import { Language } from 'src/language.enum';
import { EventStatus } from '../entities/event-status.enum';


/**
 * Required arguments
 * 1. Event title and description in different languages
 * 2. Recurring time
 * 3. ProviderID
 * 4. Event location, logitude and latitude
 * 5. Minimum and maximum age
 * 6. Registration deadline
 * 7. CategoryIds
 */
@InputType()
export class CreateEventInput {

  @IsUUID()
  @IsNotEmpty()
  @Field(() => String, { description: 'Id of provider hosting the event' })
  providerId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => Date)
  @Field(() => [Date], { description: 'List of dates when a given event will recur' })
  recurringDates: Date[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => EventDetailsInput)
  @Field(() => [EventDetailsInput], { description: 'Event details in different languages' })
  eventDetails: EventDetailsInput[];

  @IsArray()
  @Type(() => String)
  @Field(() => [String], { description: 'Ids of categories an event belongs to' })
  categoryIds: string[];

  @IsDate()
  @IsNotEmpty()
  registrationDeadline: Date;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  minAge: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  maxAge: number;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(13)
  longitude: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(12)
  latitude: string;

  @IsEnum(EventStatus)
  @IsNotEmpty()
  status: EventStatus;

}

@InputType()
export class EventDetailsInput {

  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Title of the event' })
  title: string;

  @IsString()
  @Field(() => String, { description: 'Description of the event' })
  description: string;

  @IsEnum(Language)
  @IsNotEmpty()
  @Field(() => Language, { description: 'Language support' })
  language: Language;
}
