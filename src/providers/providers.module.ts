import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { ProvidersResolver } from './providers.resolver';
import { ProvidersService } from './providers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Provider])],
  providers: [ProvidersResolver, ProvidersService]
})
export class ProvidersModule { }
