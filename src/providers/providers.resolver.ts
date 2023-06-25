import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { CreateProviderInput } from './dto/create-provider.input';
import { InviteStaffInput } from './dto/invite-staff.input';
import { TerminateStaffInput } from './dto/terminate-staff.input';
import { UpdateProviderInput } from './dto/update-provider.input';
import { ProviderStaff } from './entities/provider-staff.entity';
import { Provider } from './entities/provider.entity';
import { ProvidersService } from './providers.service';

@Resolver(() => Provider)
export class ProvidersResolver {
  constructor(private readonly providersService: ProvidersService) { }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Provider, { name: 'registerProvider' })
  createProvider(@CurrentUser() user: User, @Args('createProviderInput') createProviderInput: CreateProviderInput) {
    return this.providersService.create(user.id, createProviderInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ProviderStaff, { name: 'inviteStaff' })
  inviteStaff(@CurrentUser() user: User, @Args('inviteStaff') inviteStaffInput: InviteStaffInput) {
    return this.providersService.inviteStaff(user.id, inviteStaffInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ProviderStaff, { name: 'terminateStaff' })
  terminateStaff(@CurrentUser() user: User, @Args('terminateStaffInput') terminateStaffInput: TerminateStaffInput) {
    return this.providersService.terminateStaff(user.id, terminateStaffInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Provider, { name: 'updateProvider' })
  updateProvider(@CurrentUser() user: User, @Args('updateProviderInput') updateProviderInput: UpdateProviderInput) {
    return this.providersService.update(user.id, updateProviderInput);
  }

  @Query(() => Provider, { name: 'provider', nullable: true })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.providersService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Provider, { name: 'findMyProvider', nullable: true })
  findMyProviders(@CurrentUser() user: User) {
    return this.providersService.findMyProvider(user.id);
  }
}
