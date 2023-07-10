import { Field, InputType } from "@nestjs/graphql";
import { IsObject, IsString } from "class-validator";

@InputType()
class DataInput {
    @IsString()
    @Field()
    key: string;
}

@InputType()
export class ImageInput {
    @IsObject()
    @Field()
    data: DataInput;
}