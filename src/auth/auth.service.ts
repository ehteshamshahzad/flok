import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { LoginUserResponse } from 'src/auth/dto/login-user-response.dto';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) { }

  async login(loginUserInput: LoginUserInput) {
    const user = await this.usersService.findUserIdPasswordByEmail(loginUserInput.email);

    const checkPassword = await argon2.verify(user.password, loginUserInput.password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      hashLength: 50,
      secret: Buffer.from(this.configService.get<string>('HASH_SECRET')),
    });

    if (!user || checkPassword) {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not Found',
        message: [
          'Incorrect email or password'
        ]
      }, HttpStatus.NOT_FOUND);
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        name: loginUserInput.email,
      },
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '86400s',
      },
    );
    const result: LoginUserResponse = {
      accessToken
    };

    return result;
  }

}
