import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ContactDto {
    @Field(() => String)
    id: string;
}