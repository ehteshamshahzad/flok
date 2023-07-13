import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { ImageUploadResolver } from './image-upload.resolver';
import { ImageUploadService } from './image-upload.service';
import { EventsModule } from 'src/events/events.module';
import { ConfigService } from '@nestjs/config';
import { ProvidersService } from 'src/providers/providers.service';
import { ParentsService } from 'src/parents/parents.service';
import { ProvidersModule } from 'src/providers/providers.module';
import { ParentsModule } from 'src/parents/parents.module';

@Module({
  imports: [EventsModule, ProvidersModule, ParentsModule, UsersModule],
  providers: [ImageUploadResolver, ImageUploadService],
})
export class ImageUploadModule {}
