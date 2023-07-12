import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { ImageKeyDto } from './dto/image-key.dto';
import { ImageInput } from './dto/image.input';
import { ImageUploadService } from './image-upload.service';

@Resolver()
export class ImageUploadResolver {
  constructor(private readonly imageUploadService: ImageUploadService) {}

  @Query(() => ImageKeyDto, { name: 'imageObject' })
  imageObject(@Args('extension') extension: string) {
    return this.imageUploadService.imageObject(extension);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, { name: 'userProfile' })
  userProfile(
    @CurrentUser() user: User,
    @Args('userProfileInput') userProfileInput: ImageInput
  ) {
    return this.imageUploadService.userProfile(user.id, userProfileInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, { name: 'missionStatementImage' })
  missionStatementImage(
    @CurrentUser() user: User,
    @Args('missionStatementImage') missionStatementImage: ImageInput
  ) {
    return this.imageUploadService.missionStatementImage(
      user.id,
      missionStatementImage
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, { name: 'bannerImage' })
  bannerImage(
    @CurrentUser() user: User,
    @Args('bannerImage') bannerImage: ImageInput
  ) {
    return this.imageUploadService.bannerImage(user.id, bannerImage);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, { name: 'eventImage' })
  eventImage(
    @CurrentUser() user: User,
    @Args('eventImage') eventImage: ImageInput
  ) {
    return this.imageUploadService.eventImage(user.id, eventImage);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, { name: 'eventBannerImage' })
  eventBannerImage(
    @CurrentUser() user: User,
    @Args('eventBannerImage') eventBannerImage: ImageInput
  ) {
    return this.imageUploadService.eventBannerImage(user.id, eventBannerImage);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, { name: 'childImage' })
  childImage(
    @CurrentUser() user: User,
    @Args('childImage') childImage: ImageInput
  ) {
    return this.imageUploadService.childImage(user.id, childImage);
  }
}
