import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
// import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { RegisterUserResponseDto } from './dto/register-user-response.dto';
import { RegisterUserInput } from './dto/register-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { AccountStatus } from './entities/account-status.enum';
import { UserType } from './entities/user-type.enum';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly configService: ConfigService
  ) { }

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
          "Passwords do not match"
        ]
      }, HttpStatus.BAD_REQUEST);
    }

    const existingUserPromise = this.usersRepository.findOne({ where: { email: registerUserInput.email } });

    const user = new User();
    user.setId = undefined;
    user.accountStatus = AccountStatus.UNVERIFIED;
    user.userType = registerUserInput.userType;
    user.email = registerUserInput.email;
    user.name = registerUserInput.name;
    user.password = registerUserInput.password;
    // user.password = await argon2.hash(registerUserInput.password, {
    //   type: argon2.argon2id,
    //   memoryCost: 2 ** 16,
    //   hashLength: 50,
    //   secret: Buffer.from(this.configService.get<string>('HASH_SECRET'))
    // });

    const existingUser = await existingUserPromise;
    if (existingUser) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Invalid Email',
        message: [
          "Email address is already in use"
        ]
      }, HttpStatus.BAD_REQUEST);
    }

    const savedUser = await this.usersRepository.save(user);
    const result: RegisterUserResponseDto = {
      name: savedUser.name,
      email: savedUser.email
    }
    return result;
  }

  async findUserIdPasswordByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email }, select: { id: true, password: true } })
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const result = await this.usersRepository.findOne({ where: { id } }) ?? {} as User;
    return result;
  }

  async findUserIdByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email }, select: { id: true } });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
