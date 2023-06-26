import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { ChildDto } from './dto/child.dto';
import { CreateUpdateChildInput } from './dto/create-update-child.input';
import { CreateUpdateContactInput } from './dto/create-update-contact.input';
import { Child } from './entities/child.entity';
import { Contact } from './entities/contact.entity';
import { ParentsService } from './parents.service';

@Resolver(() => Child)
export class ParentsResolver {
  constructor(private readonly parentsService: ParentsService) { }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Child, { name: 'createUpdateChild' })
  createUpdateChild(@CurrentUser() user: User, @Args('createUpdateChildInput') createUpdateChildInput: CreateUpdateChildInput) {
    return this.parentsService.createUpdateChild(user.id, createUpdateChildInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Child, { name: 'createUpdateContact' })
  createUpdateContact(@CurrentUser() user: User, @Args('createUpdateContactInput') createUpdateContactInput: CreateUpdateContactInput) {
    return this.parentsService.createUpdateContact(user.id, createUpdateContactInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Child], { name: 'findAllChildren' })
  findAllChildren(@CurrentUser() user: User) {
    return this.parentsService.findAllChildren(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Contact], { name: 'findAllContacts' })
  findAllContacts(@CurrentUser() user: User) {
    return this.parentsService.findAllContacts(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ChildDto, { name: 'removeChild', nullable: true })
  removeChild(@CurrentUser() user: User, @Args('id', { type: () => String }) id: string) {
    return this.parentsService.removeChild(user.id, id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Contact, { name: 'removeContact', nullable: true })
  removeContact(@CurrentUser() user: User, @Args('id', { type: () => String }) id: string) {
    return this.parentsService.removeContact(user.id, id);
  }
}
