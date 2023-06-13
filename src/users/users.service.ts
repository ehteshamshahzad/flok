import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { seedUsers } from './seed';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) { }

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
    return this.usersRepository.findOne({ where: { email }, select: { id: true } });
  }

  async createUser(user: User) {
    return this.usersRepository.save(user);
  }

  async seed() {
    const savedUsersPromise = [];
    for (let i = 0; i < seedUsers.length; i++) {
      const user = new User();
      user.setId = undefined;
      user.name = seedUsers[i].name;
      user.email = seedUsers[i].email;
      user.password = seedUsers[i].password;
      user.userType = seedUsers[i].userType;
      user.accountStatus = seedUsers[i].accountStatus;
      savedUsersPromise.push(this.usersRepository.save(user));
    }

    for (let i = 0; i < savedUsersPromise.length; i++) {
      await savedUsersPromise[i];
    }
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
