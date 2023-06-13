import { TypeOrmModuleOptions } from "@nestjs/typeorm";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const config: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DATABASE_HOST as string,
    port: parseInt(process.env.DATABASE_PORT as string, 10),
    username: process.env.DATABASE_USER as string,
    password: process.env.DATABASE_PASSWORD as string,
    database: process.env.DATABASE_NAME as string,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/db/migrations/*.js'],
    autoLoadEntities: true,
    synchronize: false,
    ssl: {
        rejectUnauthorized: true
    }
    // logging: true
}