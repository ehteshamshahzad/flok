import { AccountStatus } from "./entities/account-status.enum";
import { UserType } from "./entities/user-type.enum";
import { User } from "./entities/user.entity";

export const seedUsers = [
    {
        id: '4a1b9056-4844-4964-8438-4c2be59e499c',
        name: 'Ehtesham Shahzad',
        email: 'ehteshamshahzad@hotmail.com',
        password: '^#^5c^IX11$3',
        userType: UserType.ADMIN,
        accountStatus: AccountStatus.ACTIVE
    },
    {
        id: '41463052-0372-450d-83cc-a5a1817d7905',
        name: 'Daniyal Sultan',
        email: 'daniyalsultan8@gmail.com',
        password: 'E!!^$595H3lf',
        userType: UserType.ADMIN,
        accountStatus: AccountStatus.ACTIVE
    },
    {
        id: '3ba74e71-194a-46f9-a2cd-f638a98e0ac0',
        name: 'Philip Cutting',
        email: 'cuttingphilip@gmail.com',
        password: '3&4L9%Bo3q#&',
        userType: UserType.ADMIN,
        accountStatus: AccountStatus.ACTIVE
    },
    {
        id: '11d63a9f-4712-431a-9e2f-d3152f8b04ca',
        name: 'Ahtisham Badar',
        email: 'ahtisham.rajpoot.badar@gmail.com',
        password: '$*Kz2%5#4T8m',
        userType: UserType.ADMIN,
        accountStatus: AccountStatus.ACTIVE
    },
] as User[];