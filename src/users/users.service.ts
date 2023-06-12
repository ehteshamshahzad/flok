import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly configService: ConfigService
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
    return await this.usersRepository.findOne({ where: { email }, select: { id: true } });
  }

  async createUser(user: User) {
    return await this.usersRepository.save(user);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
