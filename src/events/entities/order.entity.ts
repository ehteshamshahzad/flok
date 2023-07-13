import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/base-entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { TicketOrder } from './ticket-order.entity';
/**
 * userId
tax/extraCharges
fees
currency
totalCharge
confirmationNumber
 */
@Entity('order')
@ObjectType()
export class Order extends BaseEntity {
  @Column({ nullable: false, unique: false, length: 36 })
  @Field(() => String, { description: 'Id of user who placed the order' })
  userId: string;

  @ManyToOne(() => User, (user: User) => user.tickets, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'userId' })
  @Field({ nullable: true })
  user: User;

  @Column({ nullable: false, unique: false })
  @Field(() => Number, { description: 'Tax on the order' })
  tax: number;

  @Column({ nullable: false, unique: false })
  @Field(() => Number, { description: 'Any extra fees on order' })
  fees: number;

  @Column({ nullable: false, unique: false })
  @Field(() => Number, { description: 'Any extra fees on order' })
  extraCharges: number;

  @Column({ nullable: false, unique: false })
  @Field(() => Number, { description: 'Total cost of the order' })
  totalCharges: number;

  @Column({ nullable: false, unique: false })
  @Field(() => Number, { description: 'Confirmation number of the order' })
  confirmationNumber: string;

  @OneToMany(
    () => TicketOrder,
    (ticketOrders: TicketOrder) => ticketOrders.order
  )
  ticketOrders: TicketOrder[];
}
