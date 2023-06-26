import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { EventsModule } from './events/events.module';
import { config } from './orm.config';
import { ProvidersModule } from './providers/providers.module';
import { UsersModule } from './users/users.module';
import { ParentsModule } from './parents/parents.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // include: [],
      autoSchemaFile: true,
      csrfPrevention: false,
      playground: true,
      // useFactory: () => {
      //   const schemaModuleOptions: Partial<GqlModuleOptions> = {};
      //   // If we are in development, we want to generate the schema.graphql
      //   log("process.env.NODE_ENV: ", process.env.NODE_ENV);
      //   if (process.env.NODE_ENV !== 'production' || process.env.IS_OFFLINE) {
      //     schemaModuleOptions.autoSchemaFile = 'src/schema.gql';
      //   } else {
      //     // For production, the file should be generated
      //     schemaModuleOptions.typePaths = ['dist/*.gql'];
      //   }

      //   return {
      //     context: ({ req }) => ({ req }),
      //     playground: true, // Allow playground in production
      //     introspection: true, // Allow introspection in production
      //     ...schemaModuleOptions,
      //   };
      // },
    }),
    ConfigModule.forRoot(
      {
        envFilePath: ['.env.beta', '.env'],
        ignoreEnvFile: false,
        isGlobal: true,
      }
    ),
    TypeOrmModule.forRoot(config),
    UsersModule,
    AuthModule,
    CategoriesModule,
    ProvidersModule,
    EventsModule,
    ParentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
