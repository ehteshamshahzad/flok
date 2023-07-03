import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Ticket } from './ticket.entity';

@Entity('ticket-order')
@ObjectType()
export class TicketOrder extends BaseEntity {

    @Column({ nullable: false, unique: false, length: 36 })
    @Field(() => String, { description: 'Id of the order' })
    orderId: string;

    @ManyToOne(() => Order, (order: Order) => order.ticketOrders, { createForeignKeyConstraints: false })
    @JoinColumn({ name: 'orderId' })
    @Field({ nullable: true })
    order: Order;

    @Column({ nullable: false, unique: false, length: 36 })
    @Field(() => String, { description: 'Id of ticket' })
    ticketId: string;

    @ManyToOne(() => Ticket, (ticket: Ticket) => ticket.ticketOrders, { createForeignKeyConstraints: false })
    @JoinColumn({ name: 'ticketId' })
    @Field({ nullable: true })
    ticket: Ticket;
}
