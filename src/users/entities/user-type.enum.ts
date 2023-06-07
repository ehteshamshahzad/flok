import { registerEnumType } from "@nestjs/graphql";

export enum UserType {
    PARENT = 'Parent',
    ADMIN = 'Admin',
    PROVIDER = 'Provider'
}

registerEnumType(UserType, {
    name: 'UserType'
})