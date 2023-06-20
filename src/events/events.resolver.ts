import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { CreateEventInput } from './dto/create-event.input';
import { FlaggedInappropriateInput } from './dto/flagged-inappropriate.input';
import { UpdateEventInput } from './dto/update-event.input';
import { Event } from './entities/event.entity';
import { FlaggedInappropriate } from './entities/flagged-inappropriate.entity';
import { EventsService } from './events.service';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) { }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Event, { name: 'createEvent' })
  createEvent(@CurrentUser() user: User, @Args('createEventInput') createEventInput: CreateEventInput) {
    return this.eventsService.createEvent(user.id, createEventInput);
  }

  @Query(() => [Event], { name: 'events' })
  findAll() {
    return this.eventsService.findAll();
  }

  @Query(() => Event, { name: 'event' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.eventsService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Event)
  updateEvent(@CurrentUser() user: User, @Args('updateEventInput') updateEventInput: UpdateEventInput) {
    return this.eventsService.update(user.id, updateEventInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => FlaggedInappropriate)
  async flagEvent(@CurrentUser() user: User, @Args('flaggedInappropriateInput') flaggedInappropriateInput: FlaggedInappropriateInput) {
    return this.eventsService.flagEvent(user.id, flaggedInappropriateInput);
  }

  @Mutation(() => Event)
  removeEvent(@Args('id', { type: () => Int }) id: number) {
    return this.eventsService.remove(id);
  }
}
