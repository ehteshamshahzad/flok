import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvidersModule } from 'src/providers/providers.module';
import { UsersModule } from 'src/users/users.module';
import { Event } from './entities/event.entity';
import { EventsResolver } from './events.resolver';
import { EventsService } from './events.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), UsersModule, ProvidersModule],
  providers: [EventsResolver, EventsService]
})
export class EventsModule { }
