export class AwsS3PresignedPostParamsDto {
  Bucket?: string;
  Fields?: {
    key: string;
  };
  Expires?: number;
  Conditions?: Array<{ [key: string]: any } | [string, any, any]>;
}
