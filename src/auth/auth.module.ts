import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({})
  ],
  providers: [AuthResolver, AuthService, AccessTokenStrategy]
})
export class AuthModule { }
