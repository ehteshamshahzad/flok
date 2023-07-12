import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { Event } from 'src/events/entities/event.entity';
import { EventsService } from 'src/events/events.service';
import { ParentsService } from 'src/parents/parents.service';
import { ProvidersService } from 'src/providers/providers.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { v4 as uuidv4 } from 'uuid';
import { AwsS3PresignedPostParamsDto } from './dto/aws-s3-presigned-post-params.dto';
import { ImageKeyDto } from './dto/image-key.dto';

@Injectable()
export class ImageUploadService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly eventsService: EventsService,
    private readonly providersService: ProvidersService,
    private readonly parentsService: ParentsService
  ) {}

  s3 = new AWS.S3({
    accessKeyId: this.configService.get<string>('ACCESS_KEY_ID'),
    secretAccessKey: this.configService.get<string>('SECRET_ACCESS_KEY'),
    signatureVersion: 'v4',
  });

  async imageObject(extension: string): Promise<ImageKeyDto> {
    extension = extension.toLowerCase();
    if (
      extension !== 'png' &&
      extension !== 'jpg' &&
      extension !== 'jpeg' &&
      extension !== 'webp'
    ) {
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          message: [`File can either be png, jpg/jpeg, or webp.`],
          error: 'Invalid file type',
        },
        HttpStatus.FORBIDDEN
      );
    }

    const key = `image-${uuidv4()}.${extension}`;

    const params: AwsS3PresignedPostParamsDto = {
      Bucket: this.configService.get<string>('S3_BUCKET_NAME'),
      Fields: {
        key,
      },
      Expires: 120,
      Conditions: [
        ['starts-with', '$Content-Type', 'image/'],
        ['content-length-range', 0, 1000000],
      ],
    };
    await this.s3.createPresignedPost(params);

    return { key };
  }

  async deleteImage(key: string) {
    try {
      this.s3
        .deleteObject({
          Bucket: this.configService.get('S3_BUCKET_NAME'),
          Key: key,
        })
        .promise();
    } catch (error) {
      console.log(error);
    }
  }

  async userProfile(userId: string, data: any) {
    const user: User =
      await this.usersService.findUserIdProfileImageURLProfileImageKeyById(
        userId
      );

    if (user.profileImageKey) {
      this.deleteImage(user.profileImageKey);
    }
    user.profileImageKey = data.key;
    user.profileImageURL = `${this.configService.get<string>(
      `S3_BUCKET_BASE_URL`
    )}/${data.key}`;

    try {
      await this.usersService.updateUserImage(user);
    } catch (error) {
      console.log('Unable to update: ', error);
    }
    return { profileImageURL: user.profileImageURL };
  }

  async missionStatementImage(userId: string, data: any) {
    const event: Event =
      await this.eventsService.findEventIdMissionStatementImageURLAndKeyByUserId(
        userId
      );

    if (event.bannerImageKey) {
      this.deleteImage(event.bannerImageKey);
    }

    event.bannerImageKey = data.keyl;
    event.bannerImageURL = `${this.configService.get<string>(
      `S3_BUCKET_BASE_URL`
    )}/${data.key}`;

    try {
      // await this.usersService.updateMissionStatementImage(event);
    } catch (error) {
      console.log('Unable to update: ', error);
    }
    return { eventBannerImageURL: event.bannerImageURL };

    return;
  }

  async bannerImage(userId: string, data: any) {
    return;
  }

  async eventImage(userId: string, data: any) {
    return;
  }

  async eventBannerImage(userId: string, data: any) {
    return;
  }

  async childImage(userId: string, data: any) {
    return;
  }
}
