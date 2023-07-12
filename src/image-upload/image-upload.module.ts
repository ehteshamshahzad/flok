import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { ImageUploadResolver } from './image-upload.resolver';
import { ImageUploadService } from './image-upload.service';

@Module({
  imports: [UsersModule],
  providers: [ImageUploadResolver, ImageUploadService],
})
export class ImageUploadModule {}
