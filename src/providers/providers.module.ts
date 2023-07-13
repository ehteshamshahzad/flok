import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { ProviderStaff } from './entities/provider-staff.entity';
import { Provider } from './entities/provider.entity';
import { ProvidersResolver } from './providers.resolver';
import { ProvidersService } from './providers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Provider, ProviderStaff]), UsersModule],
  providers: [ProvidersResolver, ProvidersService],
  exports: [ProvidersService],
})
export class ProvidersModule {}
