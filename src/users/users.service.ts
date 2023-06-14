import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { hashFunction } from 'src/utils/hash-password';
import { Repository } from 'typeorm';
import { UpdateUserInput } from './dto/update-user.input';
import { UserDto } from './dto/user.input';
import { UserType } from './entities/user-type.enum';
import { User } from './entities/user.entity';
import { seedUsers } from './seed';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly configService: ConfigService
  ) { }

  async findUserIdNameUserTypeProfileImageDoBPasswordByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
      select: {
        id: true,
        name: true,
        userType: true,
        profileImageURL: true,
        dateOfBirth: true,
        password: true
      }
    });
  }

  async findAll() {
    const usersResponse: UserDto[] = [];
    const users = await this.usersRepository.find({ select: { id: true, name: true, email: true, accountStatus: true, dateOfBirth: true, profileImageURL: true, userType: true } });
    for (let i = 0; i < users.length; i++) {
      usersResponse.push({
        id: users[i].id,
        name: users[i].name,
        email: users[i].email,
        dateOfBirth: users[i].dateOfBirth,
        profileImageURL: users[i].profileImageURL,
        userType: users[i].userType
      });
    }
    return usersResponse;
  }

  async findOne(id: string): Promise<UserDto> {
    return await this.usersRepository.findOne({ where: { id } }) ?? {} as UserDto;
  }

  async updateUser(userId: string, updateUserInput: UpdateUserInput): Promise<UserDto> {

    const user = await this.usersRepository.findOne({ where: { id: userId } });

    user.updateUpdatedAt();
    user.name = updateUserInput.name;
    user.dateOfBirth = updateUserInput.dateOfBirth && updateUserInput.dateOfBirth;

    await this.usersRepository.update(userId, user);
    return await this.findOne(userId) as UserDto;
  }

  async findUserIdByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email }, select: { id: true } });
  }

  async createUser(user: User) {
    return this.usersRepository.save(user);
  }

  async seed() {
    const savedUsersPromise: Promise<User>[] = [];
    for (let i = 0; i < seedUsers.length; i++) {
      const user = new User();
      user.setId = seedUsers[i].id;
      user.name = seedUsers[i].name;
      user.email = seedUsers[i].email;
      user.password = hashFunction(seedUsers[i].password, `${this.configService.get<string>('HASH_SECRET')}_${user.id}`);
      user.userType = seedUsers[i].userType;
      user.accountStatus = seedUsers[i].accountStatus;
      savedUsersPromise.push(this.usersRepository.save(user));
    }

    const savedUsers: User[] = [];
    for (let i = 0; i < savedUsersPromise.length; i++) {
      savedUsers.push(await savedUsersPromise[i]);
    }

    return savedUsers;
  }

  async findUserIdByIdUserType(id: string, userType: UserType) {
    return this.usersRepository.findOne({ where: { id, userType }, select: { id: true } });
  }
}
