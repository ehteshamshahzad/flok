import { Test, TestingModule } from '@nestjs/testing';
import { ImageUploadResolver } from './image-upload.resolver';
import { ImageUploadService } from './image-upload.service';

describe('ImageUploadResolver', () => {
  let resolver: ImageUploadResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageUploadResolver, ImageUploadService],
    }).compile();

    resolver = module.get<ImageUploadResolver>(ImageUploadResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
