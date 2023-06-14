import { registerEnumType } from "@nestjs/graphql";

export enum EmploymentStatus {
    OWNER = 'Owner',
    EMPLOYEED = 'Employeed',
    TERMINATED = 'Terminated',
}

registerEnumType(EmploymentStatus, {
    name: 'EmploymentStatus'
})