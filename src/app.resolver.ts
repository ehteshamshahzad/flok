import { } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';

@Resolver(() => User)
export class AppResolver {
  constructor(private readonly appService: AppService) { }

  @Query(() => User, { name: 'hello', nullable: true })
  sayHello(): User {
    return {} as User;
  }
}
