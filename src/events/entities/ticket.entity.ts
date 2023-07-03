import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/base-entity';
import { Event } from 'src/events/entities/event.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { TicketOrder } from './ticket-order.entity';

@Entity('ticket')
@ObjectType()
export class Ticket extends BaseEntity {

  @Column({ nullable: false, unique: false, length: 36 })
  @Field(() => String, { description: 'Id of event the ticket belongs to' })
  eventId: string;

  @ManyToOne(() => Event, (event: Event) => event.tickets, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'eventId' })
  @Field({ nullable: true })
  event: Event;

  @Column({ nullable: true, unique: false, length: 36 })
  @Field(() => String, { description: 'Id of user who bought the ticker' })
  userId: string;

  @ManyToOne(() => User, (user: User) => user.tickets, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'userId' })
  @Field({ nullable: true })
  user: User;

  @Column({ nullable: false, unique: false })
  @Field(() => Number, { description: 'Price of the ticket' })
  price: number;

  @OneToMany(() => TicketOrder, (ticketOrders: TicketOrder) => ticketOrders.ticket)
  ticketOrders: TicketOrder[];
}
