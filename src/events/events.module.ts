import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvidersModule } from 'src/providers/providers.module';
import { UsersModule } from 'src/users/users.module';
import { EventCategory } from './entities/event-category.entity';
import { EventMultiLangauge } from './entities/event-multi-langauge.entity';
import { EventPicture } from './entities/event-picrture.entity';
import { RecurringEvent } from './entities/event-recuring-until.entity';
import { EventReview } from './entities/event-review.entity';
import { EventWaitingList } from './entities/event-waiting-list.entity';
import { Event } from './entities/event.entity';
import { FlaggedInappropriate } from './entities/flagged-inappropriate.entity';
import { Ticket } from './entities/ticket.entity';
import { EventsResolver } from './events.resolver';
import { EventsService } from './events.service';
import { TicketsService } from './tickets.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Event,
      EventCategory,
      EventMultiLangauge,
      EventPicture,
      RecurringEvent,
      EventReview,
      EventWaitingList,
      FlaggedInappropriate,
      Ticket,
    ]),
    UsersModule,
    ProvidersModule,
  ],
  providers: [EventsResolver, EventsService, TicketsService],
})
export class EventsModule {}
