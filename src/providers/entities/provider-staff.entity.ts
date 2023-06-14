import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/base-entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity } from 'typeorm';
import { EmploymentStatus } from './employment-status.enum';
import { Provider } from './provider.entity';

@Entity('provider-staff')
@ObjectType()
export class ProviderStaff extends BaseEntity {

    @Field({ nullable: false, description: `ID of User belonging to a Provider` })
    @Column({ nullable: false, unique: false, length: 36 })
    userId: string;
    // @ManyToOne(() => User, (user: User) => user.providerStaff)
    // @JoinColumn({ name: 'userId' })
    user: User;

    @Field({ nullable: false, description: `ID of a Provider which as employeed a User` })
    @Column({ nullable: false, unique: false, length: 36 })
    providerId: string;
    // @ManyToOne(() => Provider, (provider: Provider) => provider.providerStaff)
    // @JoinColumn({ name: 'providerId' })
    provider: Provider;

    @Field({ nullable: false, description: `Employment status: "Owner" | "Employeed" | "Terminated"` })
    @Column({ nullable: false, unique: false })
    employmentStatus: EmploymentStatus;

}
