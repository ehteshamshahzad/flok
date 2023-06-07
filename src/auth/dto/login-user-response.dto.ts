import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginUserResponse {

    @Field({ description: 'User JWT token' })
    accessToken: string;

}