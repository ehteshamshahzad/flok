import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginUserResponse } from 'src/auth/dto/login-user-response.dto';
import { AccountStatus } from 'src/users/entities/account-status.enum';
import { UserType } from 'src/users/entities/user-type.enum';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { hashFunction } from 'src/utils/hash-password';
import { LoginUserInput } from './dto/login-user.input';
import { RegisterUserResponseDto } from './dto/register-user-response.dto';
import { RegisterUserInput } from './dto/register-user.input';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) { }

  async login(loginUserInput: LoginUserInput) {
    const user = await this.usersService.findUserIdNameUserTypeProfileImageDoBPasswordProvidersStaffIdByEmail(loginUserInput.email);

    const checkPassword = hashFunction(loginUserInput.password, `${this.configService.get<string>('HASH_SECRET')}_${user.id}`); // true

    if (!user || (checkPassword !== user.password)) {
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
      id: user.id,
      name: user.name,
      email: loginUserInput.email,
      userType: user.userType,
      profileImageURL: user.profileImageURL,
      dateOfBirth: user.dateOfBirth,
      providerStaffId: user.providerStaffId,
      accessToken
    };

    return result;
  }

  /**
  * Requirements
  * 1. Make sure passwords match
  * 2. Make sure email is not already in use
  * 3. Encrypt password
  * 4. Save user
  * 5. Return DTO containing only the email and name
  */
  async register(registerUserInput: RegisterUserInput): Promise<RegisterUserResponseDto> {

    if (registerUserInput.userType === UserType.ADMIN) {
      throw new HttpException({
        statusCode: HttpStatus.FORBIDDEN,
        error: 'Request failed',
        message: [
          'Please contact support'
        ]
      }, HttpStatus.FORBIDDEN);
    }

    if (registerUserInput.password !== registerUserInput.confirmPassword) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Invalid password',
        message: [
          'Passwords do not match'
        ]
      }, HttpStatus.BAD_REQUEST);
    }

    const existingUserPromise = this.usersService.findUserIdByEmail(registerUserInput.email);

    const user = new User();
    user.setId = undefined;
    user.accountStatus = AccountStatus.UNVERIFIED;
    user.userType = registerUserInput.userType;
    user.email = registerUserInput.email;
    user.name = registerUserInput.name;

    user.password = hashFunction(registerUserInput.password, `${this.configService.get<string>('HASH_SECRET')}_${user.id}`);

    const existingUser = await existingUserPromise;
    if (existingUser) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Invalid Email',
        message: [
          'Email address is already in use'
        ]
      }, HttpStatus.BAD_REQUEST);
    }

    const savedUser = await this.usersService.createUser(user);
    const result: RegisterUserResponseDto = {
      name: savedUser.name,
      email: savedUser.email
    }
    return result;
  }

}
