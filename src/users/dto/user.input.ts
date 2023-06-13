import { Field, ObjectType } from '@nestjs/graphql';
import { UserType } from '../entities/user-type.enum';

@ObjectType()
export class UserDto {

    @Field(() => String)
    id: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    name: string;

    @Field(() => UserType)
    userType: UserType;

    @Field(() => String, { nullable: true })
    profileImageURL: string;

    @Field(() => String, { nullable: true })
    dateOfBirth: Date;

}