import { registerEnumType } from "@nestjs/graphql";

export enum AccountStatus {
    ACTIVE = 'Active',
    DELETED = 'Deleted',
    SUSPENDED = 'Suspended',
    UNVERIFIED = 'Unverified'
}

registerEnumType(AccountStatus, {
    name: 'AccountStatus'
})