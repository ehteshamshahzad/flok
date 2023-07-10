import { Field, ObjectType } from '@nestjs/graphql';
import { Provider } from '../entities/provider.entity';

@ObjectType()
export class PaginatedProviders {
  @Field(() => [Provider])
  items: Provider[];

  @Field({ description: 'Total number of items' })
  totalItems: number;

  @Field({ description: 'Limit of items per page' })
  limit: number;

  @Field({ description: 'Current page' })
  page: number;
}
