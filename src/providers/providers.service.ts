import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProviderInput } from './dto/create-provider.input';
import { UpdateProviderInput } from './dto/update-provider.input';
import { Provider } from './entities/provider.entity';

@Injectable()
export class ProvidersService {

  constructor(@InjectRepository(Provider) private readonly providersRepository: Repository<Provider>) { }

  async create(createProviderInput: CreateProviderInput) {

    const provider = new Provider();
    provider.setId = undefined;
    provider.titleName = createProviderInput.titleName;
    provider.name = createProviderInput.name;
    provider.email = createProviderInput.email;

    return await this.providersRepository.save(provider)
  }

  findAll() {
    return `This action returns all providers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} provider`;
  }

  update(id: number, updateProviderInput: UpdateProviderInput) {
    return `This action updates a #${id} provider`;
  }

  remove(id: number) {
    return `This action removes a #${id} provider`;
  }
}
