import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/base-entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProviderStaff } from './provider-staff.entity';

@Entity('provider')
@ObjectType()
export class Provider extends BaseEntity {

  @Field({ nullable: false, description: `Name of Provider` })
  @Column({ nullable: false, unique: false, length: 50 })
  name: string;

  @Field({ nullable: false, description: `Title name of Provider` })
  @Column({ nullable: false, unique: false, length: 100 })
  titleName: string;

  @Field({ nullable: true, description: `Mission statement image` })
  @Column({ nullable: true, unique: false })
  missionStatementImageURL: string;

  @Field({ nullable: true, description: `Mission statement key` })
  @Column({ nullable: true, unique: false })
  missionStatementImageKey: string;

  @Field({ nullable: true, description: `Banner image` })
  @Column({ nullable: true, unique: false })
  bannerURL: string;

  @Field({ nullable: true, description: `Banner image key` })
  @Column({ nullable: true, unique: false })
  bannerKey: string;

  @Field({ nullable: true, description: `Page template: 1 | 2 | 3` })
  @Column({ nullable: false, unique: false, default: 1 })
  pageTemplate: number;

  @Field({ nullable: true, description: `Provider's email address` })
  @Column({ nullable: false, unique: true, length: 100 })
  email: string;

  @OneToMany(() => ProviderStaff, (providerStaff: ProviderStaff) => providerStaff.provider)
  providerStaff: ProviderStaff[];
}
