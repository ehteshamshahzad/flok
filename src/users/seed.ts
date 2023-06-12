import { AccountStatus } from "./entities/account-status.enum";
import { UserType } from "./entities/user-type.enum";
import { User } from "./entities/user.entity";

export const seedUsers = [
    {
        id: '',
        name: 'Ehtesham Shahzad',
        email: 'ehteshamshahzad@hotmail.com',
        password: '1234567890',
        userType: UserType.ADMIN,
        accountStatus: AccountStatus.ACTIVE
    },
    {
        id: '',
        name: 'Daniyal Sultan',
        email: 'daniyalsultan8@gmail.com',
        password: '1234567890',
        userType: UserType.ADMIN,
        accountStatus: AccountStatus.ACTIVE
    },
    {
        id: '',
        name: 'Philip Cutting',
        email: 'cuttingphilip@gmail.com',
        password: '1234567890',
        userType: UserType.ADMIN,
        accountStatus: AccountStatus.ACTIVE
    },
    {
        id: '',
        name: 'Ahtisham Badar',
        email: 'ahtisham.rajpoot.badar@gmail.com',
        password: '1234567890',
        userType: UserType.ADMIN,
        accountStatus: AccountStatus.ACTIVE
    },
] as User[];