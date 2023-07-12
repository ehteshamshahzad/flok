import { registerEnumType } from '@nestjs/graphql';

export enum Language {
  ENGLISH = 'English',
  GERMAN = 'German',
  FRENCH = 'French',
  ITALIAN = 'Italian',
}

registerEnumType(Language, {
  name: 'Language',
});
