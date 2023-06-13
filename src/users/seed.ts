import { AccountStatus } from "./entities/account-status.enum";
import { UserType } from "./entities/user-type.enum";
import { User } from "./entities/user.entity";

export const seedUsers = [
    {
        id: '',
        name: 'Ehtesham Shahzad',
        email: 'ehteshamshahzad@hotmail.com',
        password: '^#^5c^IX11$3',
        userType: UserType.ADMIN,
        accountStatus: AccountStatus.ACTIVE
    },
    {
        id: '',
        name: 'Daniyal Sultan',
        email: 'daniyalsultan8@gmail.com',
        password: 'E!!^$595H3lf',
        userType: UserType.ADMIN,
        accountStatus: AccountStatus.ACTIVE
    },
    {
        id: '',
        name: 'Philip Cutting',
        email: 'cuttingphilip@gmail.com',
        password: '3&4L9%Bo3q#&',
        userType: UserType.ADMIN,
        accountStatus: AccountStatus.ACTIVE
    },
    {
        id: '',
        name: 'Ahtisham Badar',
        email: 'ahtisham.rajpoot.badar@gmail.com',
        password: '$*Kz2%5#4T8m',
        userType: UserType.ADMIN,
        accountStatus: AccountStatus.ACTIVE
    },
] as User[];