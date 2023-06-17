import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountStatus } from 'src/users/entities/account-status.enum';
import { UserType } from 'src/users/entities/user-type.enum';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateProviderInput } from './dto/create-provider.input';
import { InviteStaffInput } from './dto/invite-staff.input';
import { TerminateStaffInput } from './dto/terminate-staff.input';
import { UpdateProviderInput } from './dto/update-provider.input';
import { EmploymentStatus } from './entities/employment-status.enum';
import { ProviderStaff } from './entities/provider-staff.entity';
import { Provider } from './entities/provider.entity';

@Injectable()
export class ProvidersService {

  constructor(
    @InjectRepository(Provider) private readonly providersRepository: Repository<Provider>,
    @InjectRepository(ProviderStaff) private readonly providerStaffRepository: Repository<ProviderStaff>,
    private readonly usersService: UsersService
  ) { }

  async create(userId: string, createProviderInput: CreateProviderInput) {

    const userPromise = this.usersService.findUserIdByIdUserType(userId, UserType.PROVIDER);

    const provider = new Provider();
    provider.setId = undefined;
    provider.titleName = createProviderInput.titleName;
    provider.name = createProviderInput.name;
    provider.email = createProviderInput.email;

    const user = await userPromise;

    if (!user) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Invalid user',
        message: [
          'Only user of type provider can create an organization'
        ]
      }, HttpStatus.BAD_REQUEST);
    }

    const savedProvider = await this.providersRepository.save(provider);

    const providerStaff = new ProviderStaff();
    providerStaff.setId = undefined;
    providerStaff.employmentStatus = EmploymentStatus.OWNER;
    providerStaff.providerId = provider.id;
    providerStaff.userId = userId;

    await this.providerStaffRepository.save(providerStaff);

    return savedProvider;

  }

  async inviteStaff(userId: string, inviteStaffInput: InviteStaffInput) {

    const providerStaff = await this.providerStaffRepository.findOne({
      where: {
        userId,
        providerId: inviteStaffInput.providerId,
        employmentStatus: EmploymentStatus.OWNER
      },
      select:
      {
        id: true,
        providerId: true
      }
    });

    if (!providerStaff) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Invalid user',
        message: [
          'Invalid user is trying to invite staff'
        ]
      }, HttpStatus.BAD_REQUEST);
    }

    const user = new User();
    user.setId = undefined;
    user.accountStatus = AccountStatus.UNVERIFIED;
    user.userType = UserType.PROVIDER;
    user.email = inviteStaffInput.email;
    user.name = inviteStaffInput.name;
    user.password = uuidv4();

    const newStaff = await this.usersService.createUser(user);

    const newProviderStaff = new ProviderStaff();
    newProviderStaff.setId = undefined;
    newProviderStaff.employmentStatus = EmploymentStatus.EMPLOYEED;
    newProviderStaff.userId = newStaff.id;
    newProviderStaff.providerId = inviteStaffInput.providerId;

    await this.providerStaffRepository.save(newProviderStaff);
    return newProviderStaff;
  }

  async terminateStaff(userId: string, terminateStaffInput: TerminateStaffInput) {

    const [providerOwner, providerStaffTerminate] = await Promise.all([
      this.providerStaffRepository.findOne({
        where: {
          userId,
          providerId: terminateStaffInput.providerId,
          employmentStatus: EmploymentStatus.OWNER
        },
        select: { id: true }
      }),
      this.providerStaffRepository.findOne({
        where: {
          userId: terminateStaffInput.staffId,
          providerId: terminateStaffInput.providerId,
          employmentStatus: EmploymentStatus.EMPLOYEED
        },
        select: { id: true, employmentStatus: true }
      })
    ]);

    if (!providerOwner || !providerStaffTerminate) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Failed to terminate',
        message: [
          'Unable to terminate staff member'
        ]
      }, HttpStatus.BAD_REQUEST);
    }

    providerStaffTerminate.employmentStatus = EmploymentStatus.TERMINATED;

    await this.providerStaffRepository.update(providerStaffTerminate.id, providerStaffTerminate);

    return await this.providerStaffRepository.findOne({ where: { id: providerStaffTerminate.id } });

  }

  async findOne(id: string) {
    return await this.providersRepository.findOne({ where: { id } });
  }

  async update(userId: string, updateProviderInput: UpdateProviderInput) {

    const providerStaff = await this.providerStaffRepository.findOne({ where: { providerId: updateProviderInput.id, userId } });

    if (!providerStaff) {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not found',
        message: [
          'Provider not found'
        ]
      }, HttpStatus.NOT_FOUND);
    }

    await this.providersRepository.update(updateProviderInput.id, updateProviderInput)
    return await this.providersRepository.findOne({ where: { id: updateProviderInput.id } });
  }

  async findProviderStaffIdByUserIdProviderIdEmployeedOrOwner(userId: string, providerId: string) {
    return await this.providerStaffRepository.findOne({
      where: [
        {
          userId,
          providerId,
          employmentStatus: EmploymentStatus.EMPLOYEED
        },
        {
          userId,
          providerId,
          employmentStatus: EmploymentStatus.OWNER
        }
      ],
      select: {
        id: true
      }
    });
  }

}
