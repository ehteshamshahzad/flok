import { registerEnumType } from '@nestjs/graphql';

export enum EventStatus {
  DRAFT = 'Draft',
  PUBLISHED = 'Published',
  ARCHIEVE = 'Archive',
  PRIVATE = 'Private',
  DELETED = 'Deleted',
}

registerEnumType(EventStatus, {
  name: 'EventStatus',
});
