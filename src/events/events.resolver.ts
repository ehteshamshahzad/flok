import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { CreateEventInput } from './dto/create-event.input';
import { FlaggedInappropriateInput } from './dto/flagged-inappropriate.input';
import { PurchaseTicketsInput } from './dto/purchase-tickets.input';
import { RemoveEventInput } from './dto/remove-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { Event } from './entities/event.entity';
import { FlaggedInappropriate } from './entities/flagged-inappropriate.entity';
import { Ticket } from './entities/ticket.entity';
import { EventsService } from './events.service';
import { TicketsService } from './tickets.service';

@Resolver(() => Event)
export class EventsResolver {
  constructor(
    private readonly eventsService: EventsService,
    private readonly ticketsService: TicketsService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Event, { name: 'createEvent' })
  createEvent(
    @CurrentUser() user: User,
    @Args('createEventInput') createEventInput: CreateEventInput,
  ) {
    return this.eventsService.createEvent(user.id, createEventInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Event], { name: 'providerEvents' })
  findAllProviderEvents(@CurrentUser() user: User) {
    return this.eventsService.findAllProviderEvents(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Event], { name: 'providerFutureEvents' })
  findAllProviderActiveEvents(@CurrentUser() user: User) {
    return this.eventsService.findAllProviderFutureEvents(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Event], { name: 'providerPastEvents' })
  findAllProviderPastEvents(@CurrentUser() user: User) {
    return this.eventsService.findAllProviderPastEvents(user.id);
  }

  @Query(() => Event, { name: 'event' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.eventsService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Event)
  updateEvent(
    @CurrentUser() user: User,
    @Args('updateEventInput') updateEventInput: UpdateEventInput,
  ) {
    return this.eventsService.update(user.id, updateEventInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => FlaggedInappropriate)
  async flagEvent(
    @CurrentUser() user: User,
    @Args('flaggedInappropriateInput')
    flaggedInappropriateInput: FlaggedInappropriateInput,
  ) {
    return this.eventsService.flagEvent(user.id, flaggedInappropriateInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Event, { nullable: true })
  removeEvent(
    @CurrentUser() user: User,
    @Args('removeEventInput') removeEventInput: RemoveEventInput,
  ) {
    return this.eventsService.remove(user.id, removeEventInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => [Ticket], { nullable: true })
  async purchaseTickets(
    @CurrentUser() user: User,
    @Args('purchaseTicketsInput') purchaseTicketsInput: PurchaseTicketsInput,
  ) {
    return await this.ticketsService.purchaseTickets(
      user.id,
      purchaseTicketsInput,
    );
  }
}
