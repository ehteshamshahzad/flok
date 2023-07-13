import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/base-entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { EmploymentStatus } from './employment-status.enum';
import { Provider } from './provider.entity';

@Entity('provider-staff')
@ObjectType()
export class ProviderStaff extends BaseEntity {
  @Field({ nullable: false, description: `ID of User belonging to a Provider` })
  @Column({ nullable: false, unique: false, length: 36 })
  userId: string;

  @OneToOne(() => User, (user: User) => user.providerStaff, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'userId' })
  @Field({ nullable: true })
  user: User;

  @Field({
    nullable: false,
    description: `ID of a Provider which as employeed a User`,
  })
  @Column({ nullable: false, unique: false, length: 36 })
  providerId: string;

  @ManyToOne(() => Provider, (provider: Provider) => provider.providerStaff, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'providerId' })
  @Field({ nullable: true, description: 'Provider object' })
  provider: Provider;

  @Field({
    nullable: false,
    description: `Employment status: "Owner" | "Employeed" | "Terminated"`,
  })
  @Column({ nullable: false, unique: false })
  employmentStatus: EmploymentStatus;
}
