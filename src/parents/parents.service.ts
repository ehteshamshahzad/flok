import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChildDto } from './dto/child.dto';
import { ContactDto } from './dto/contact.dto';
import { CreateUpdateChildInput } from './dto/create-update-child.input';
import { CreateUpdateContactInput } from './dto/create-update-contact.input';
import { Child } from './entities/child.entity';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ParentsService {

  constructor(
    @InjectRepository(Child) private readonly childrenRepository: Repository<Child>,
    @InjectRepository(Contact) private readonly contactRepository: Repository<Contact>
  ) { }

  async createUpdateChild(userId: string, createUpdateChildInput: CreateUpdateChildInput): Promise<Child> {

    if (createUpdateChildInput.id) {
      const child: Child = await this.childrenRepository.findOne({
        where: { id: createUpdateChildInput.id },
        select: { id: true, name: true, dateOfBirth: true, userId: true, createdAt: true }
      });

      if (!child || child.userId !== userId) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          error: 'Not found',
          message: [
            'Child information not found'
          ]
        }, HttpStatus.NOT_FOUND);
      }

      child.name = createUpdateChildInput.name;
      child.gender = createUpdateChildInput.gender;
      child.dateOfBirth = createUpdateChildInput.dateOfBirth;
      child.updateUpdatedAt();

      await this.childrenRepository.update(child.id, child);
      return child;
    }

    const child = new Child();
    child.setId = undefined;
    child.name = createUpdateChildInput.name;
    child.gender = createUpdateChildInput.gender;
    child.dateOfBirth = createUpdateChildInput.dateOfBirth;
    child.userId = userId;

    return await this.childrenRepository.save(child);

  }

  async createUpdateContact(userId: string, createUpdateContactInput: CreateUpdateContactInput): Promise<Contact> {

    if (createUpdateContactInput.id) {
      const contact: Contact = await this.contactRepository.findOne({
        where: { id: createUpdateContactInput.id },
        select: { id: true, name: true, email: true, userId: true, createdAt: true }
      });

      if (!contact || contact.userId !== userId) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          error: 'Not found',
          message: [
            'Contact information not found'
          ]
        }, HttpStatus.NOT_FOUND);
      }

      contact.name = createUpdateContactInput.name;
      contact.email = createUpdateContactInput.email;
      contact.userId = userId;
      contact.updateUpdatedAt();

      await this.contactRepository.update(contact.id, contact);
      return contact;
    }

    const contact = new Contact();
    contact.setId = undefined;
    contact.name = createUpdateContactInput.name;
    contact.email = createUpdateContactInput.email;
    contact.userId = userId;

    return await this.childrenRepository.save(contact);

  }

  async findAllChildren(userId: string) {
    return await this.childrenRepository.find({ where: { userId } });
  }

  async findAllContacts(userId: string) {
    return await this.contactRepository.find({ where: { userId } });
  }

  async removeChild(userId: string, id: string): Promise<ChildDto> {

    const child = await this.childrenRepository.findOne({ where: { id, userId } });

    if (!child) {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not found',
        message: [
          'Child not found'
        ]
      }, HttpStatus.NOT_FOUND);
    }

    await this.childrenRepository.delete(child.id);

    return { id: child.id } as ChildDto;
  }

  async removeContact(userId: string, id: string): Promise<ContactDto> {

    const contact = await this.contactRepository.findOne({ where: { id, userId } });

    if (!contact) {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not found',
        message: [
          'Contact not found'
        ]
      }, HttpStatus.NOT_FOUND);
    }

    await this.contactRepository.delete(id);

    return { id: contact.id } as ContactDto;
  }
}
