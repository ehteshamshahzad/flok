import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreateTicketInput } from './dto/create-ticket.input';
import { PurchaseTicketsInput } from './dto/purchase-tickets.input';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketsRepository: Repository<Ticket>
  ) {}

  async create(
    numberOfTickets: number,
    createTicketInput: CreateTicketInput
  ): Promise<Ticket[]> {
    const ticketsPromise: Promise<Ticket>[] = [];
    const tickets: Ticket[] = [];

    for (let i = 0; i < numberOfTickets; i++) {
      const ticket = new Ticket();
      ticket.setId = undefined;
      ticket.eventId = createTicketInput.eventId;
      ticket.price = createTicketInput.price;
      ticketsPromise.push(this.ticketsRepository.save(ticket));

      if (ticketsPromise.length > 5) {
        while (ticketsPromise.length !== 0) {
          tickets.push(await ticketsPromise.pop());
        }
      }
    }

    if (ticketsPromise.length > 0) {
      while (ticketsPromise.length !== 0) {
        tickets.push(await ticketsPromise.pop());
      }
    }

    return tickets;
  }

  /**
   * 0. Stripe integration
   * 1. Implement transaction instead
   * 2. Check event status (DRAFT, ARCHIEVE, PRIVATE, or DELETED). And prevent ticket purchase in those cases
   * 3. Only allow user of type PARENT to buy tickets
   */
  async purchaseTickets(
    userId: string,
    purchaseTicketsInput: PurchaseTicketsInput
  ): Promise<Ticket[]> {
    const eventTickets: Ticket[] = await this.ticketsRepository.find({
      where: {
        eventId: purchaseTicketsInput.eventId,
        userId: IsNull(),
      },
      take: purchaseTicketsInput.numberOfTickets,
    });

    if (purchaseTicketsInput.numberOfTickets !== eventTickets.length) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Request failed',
          message: ['Not enough tickets are available'],
        },
        HttpStatus.BAD_REQUEST
      );
    }

    for (let i = 0; i < eventTickets.length; i++) {
      eventTickets[i].userId = userId;
      eventTickets[i].updateUpdatedAt();
      await this.ticketsRepository.update(eventTickets[i].id, eventTickets[i]);
    }

    return eventTickets;
  }

  findAll() {
    return `This action returns all tickets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  // update(id: number, updateTicketInput: UpdateTicketInput) {
  //   return `This action updates a #${id} ticket`;
  // }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}

// eventId: 224cc68f-9177-44a9-abf5-df2bc19014dc
