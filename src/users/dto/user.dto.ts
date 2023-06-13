import { Field, InputType } from '@nestjs/graphql';
import { AccountStatus } from '../entities/account-status.enum';
import { UserType } from '../entities/user-type.enum';

@InputType()
export class UserInput {

    @Field(() => String)
    id: number;

    @Field(() => String)
    email: string;

    @Field(() => String)
    name: string;

    @Field(() => UserType)
    userType: UserType;

    @Field(() => String)
    profileImageURL: string;

    @Field(() => String)
    dateOfBirth: Date;

    @Field(() => AccountStatus)
    accountStatus: AccountStatus;
}