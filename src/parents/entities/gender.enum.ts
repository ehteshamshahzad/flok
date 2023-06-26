import { registerEnumType } from '@nestjs/graphql';

export enum Gender {
    MALE = 'Male',
    FEMALE = 'Female',
    OTHER = 'Other'
}

registerEnumType(Gender, {
    name: 'Gender'
})