import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ProvidersService } from 'src/providers/providers.service';
import { UserType } from 'src/users/entities/user-type.enum';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateEventInput, EventDetailsInput } from './dto/create-event.input';
import { EventReviewInput } from './dto/event-review.input';
import { FlaggedInappropriateInput } from './dto/flagged-inappropriate.input';
import { SearchEventInput } from './dto/search-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { EventCategory } from './entities/event-category.entity';
import { EventMultiLangauge } from './entities/event-multi-langauge.entity';
import { EventPicture } from './entities/event-picrture.entity';
import { RecurringEvent } from './entities/event-recuring-until.entity';
import { EventReview } from './entities/event-review.entity';
import { EventWaitingList } from './entities/event-waiting-list.entity';
import { Event } from './entities/event.entity';
import { FlaggedInappropriate } from './entities/flagged-inappropriate.entity';

@Injectable()
export class EventsService {

  constructor(
    @InjectRepository(Event) private readonly eventsRepository: Repository<Event>,
    @InjectRepository(EventCategory) private readonly eventCategoriesRepository: Repository<EventCategory>,
    @InjectRepository(EventMultiLangauge) private readonly eventMultiLangaugesRepository: Repository<EventMultiLangauge>,
    @InjectRepository(EventPicture) private readonly eventPicturesRepository: Repository<EventPicture>,
    @InjectRepository(RecurringEvent) private readonly recurringEventsRepository: Repository<RecurringEvent>,
    @InjectRepository(EventReview) private readonly eventReviewsRepository: Repository<EventReview>,
    @InjectRepository(EventWaitingList) private readonly eventWaitingListsRepository: Repository<EventWaitingList>,
    @InjectRepository(FlaggedInappropriate) private readonly flaggedInappropriateRepository: Repository<FlaggedInappropriate>,
    private readonly usersService: UsersService,
    private readonly providerService: ProvidersService,
    private readonly configService: ConfigService
  ) { }

  /**
   * Requirements:
   * 1. Make sure the user creating an event is of type provider/belongs to a provider and is employeed (not pending nor terminated)*
   * 2. Create event*
   * 3. Create event for different languages*
   * 4. Assign categories to event*
   * 5. Assign recurring dates to event
   */
  async createEvent(userId: string, createEventInput: CreateEventInput) {

    const validStaffPromise = this.providerService.findProviderStaffIdByUserIdProviderIdEmployeedOrOwner(userId, createEventInput.providerId);

    const event = new Event();
    event.setId = undefined;
    event.providerId = createEventInput.providerId;
    event.location = createEventInput.location;
    event.longitude = createEventInput.longitude;
    event.latitude = createEventInput.latitude;
    event.minAge = createEventInput.minAge;
    event.maxAge = createEventInput.maxAge;
    event.registrationDeadline = createEventInput.registrationDeadline;
    event.status = createEventInput.status;

    const validStaff = await validStaffPromise;
    if (!validStaff) {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not found',
        message: [
          'Invalid user or provider'
        ]
      }, HttpStatus.NOT_FOUND);
    }

    const savedEvent = await this.eventsRepository.save(event);

    const [eventMultiLangauges, eventCategories, recurringEvents] = await Promise.all([
      this.createMultiLanguageEvents(savedEvent.id, createEventInput.eventDetails),
      this.createEventCategories(savedEvent.id, createEventInput.categoryIds),
      this.assigningRecurringEventDates(savedEvent.id, createEventInput.recurringDates)
    ]);

    for (let i = 0; i < eventMultiLangauges.length; i++) {
      event.eventMultiLanguages.push(await eventMultiLangauges[i]);
    }

    for (let i = 0; i < eventCategories.length; i++) {
      event.eventCategorys.push(await eventCategories[i]);
    }

    for (let i = 0; i < recurringEvents.length; i++) {
      event.recurringEvents.push(await recurringEvents[i]);
    }

    return event;
  }

  async createMultiLanguageEvents(savedEventId: string, eventDetails: EventDetailsInput[]) {

    const eventMultiLangaugePromises: Promise<EventMultiLangauge>[] = [];
    for (let i = 0; i < eventDetails.length; i++) {
      const eventMultiLangauge = new EventMultiLangauge();
      eventMultiLangauge.setId = undefined;
      eventMultiLangauge.title = eventDetails[i].title;
      eventMultiLangauge.description = eventDetails[i].description;
      eventMultiLangauge.eventId = savedEventId;
      eventMultiLangauge.language = eventDetails[i].language;
      eventMultiLangaugePromises.push(this.eventMultiLangaugesRepository.save(eventMultiLangauge));
    }
    return eventMultiLangaugePromises;
  }

  async createEventCategories(savedEventId: string, categoryIds: string[]) {
    const eventCategoryPromises: Promise<EventCategory>[] = [];
    for (let i = 0; i < categoryIds.length; i++) {
      const eventCategory = new EventCategory();
      eventCategory.setId = undefined;
      eventCategory.categoryId = categoryIds[i];
      eventCategory.eventId = savedEventId;
      eventCategoryPromises.push(this.eventCategoriesRepository.save(eventCategory));
    }
    return eventCategoryPromises;
  }

  async assigningRecurringEventDates(savedEventId: string, recurringDates: Date[]) {
    const recurringEventPromises: Promise<RecurringEvent>[] = []
    for (let i = 0; i < recurringDates.length; i++) {
      const recurringEvent = new RecurringEvent();
      recurringEvent.setId = undefined;
      recurringEvent.date = recurringDates[i];
      recurringEvent.eventId = savedEventId;
      recurringEventPromises.push(this.recurringEventsRepository.save(recurringEvent));
    }
    return recurringEventPromises;
  }

  async findAll() {
    const events = await this.eventsRepository.find();
    return events;
  }

  /**
   * TODO: Save multiple events first
   * Conditions: 
   * 1. Date range
   * 2. Longitude and latitude
   * 3. Category
   * 4. Provider
   * 5. Name
   * 
   * * Some combination
   * * Pagination
   */
  async findByConditions(searchEventInput: SearchEventInput) {
    return;
  }

  async findOne(id: string) {
    return await this.eventsRepository.findOne({ where: { id } });
  }

  // Pending
  async update(userId: string, updateEventInput: UpdateEventInput) {

    const event = await this.eventsRepository.findOne({ where: { id: updateEventInput.id } });

    if (!event) {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not found',
        message: [
          'Event not found'
        ]
      }, HttpStatus.NOT_FOUND);
    }

    return event;
  }

  /**
   * Requirements:
   * 1. User of type parent who is flagging the event
   * 2. Check if event exists
   * 3. 
   */
  async flagEvent(userId: string, flaggedInappropriateInput: FlaggedInappropriateInput) {

    const eventPromise = this.eventsRepository.findOne({ where: { id: flaggedInappropriateInput.eventId }, select: { id: true } });
    const user = await this.usersService.findUserIdByIdUserType(userId, UserType.PARENT);
    if (!user) {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not found',
        message: [
          'Parent not found'
        ]
      }, HttpStatus.NOT_FOUND);
    }

    const event = await eventPromise;
    if (!event) {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not found',
        message: [
          'Event not found'
        ]
      }, HttpStatus.NOT_FOUND);
    }

    const flaggedInappropriate = new FlaggedInappropriate();
    flaggedInappropriate.setId = undefined;
    flaggedInappropriate.eventId = flaggedInappropriateInput.eventId;
    flaggedInappropriate.userId = userId;
    flaggedInappropriate.description = flaggedInappropriateInput.description;

    return await this.flaggedInappropriateRepository.save(flaggedInappropriate);

  }

  async createEventReview(userId: string, eventReviewInput: EventReviewInput) {

    const eventPromise = this.eventsRepository.findOne({ where: { id: eventReviewInput.eventId }, select: { id: true } });
    const user = await this.usersService.findUserIdByIdUserType(userId, UserType.PARENT);

    if (!user) {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not found',
        message: [
          'Parent not found'
        ]
      }, HttpStatus.NOT_FOUND);
    }

    const event = await eventPromise;
    if (!event) {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not found',
        message: [
          'Event not found'
        ]
      }, HttpStatus.NOT_FOUND);
    }

    const eventReview = new EventReview();
    eventReview.setId = undefined;
    eventReview.eventId = eventReviewInput.eventId;
    eventReview.userId = userId;
    eventReview.rating = eventReviewInput.rating;
    eventReview.review = eventReviewInput.review;

    return await this.eventReviewsRepository.save(eventReview);
  }

  async getEventReviews(userId: string, providerId: string, eventId: string) {

    const provider = await this.providerService.findProviderStaffIdByUserIdProviderIdEmployeedOrOwner(userId, providerId);

    if (!provider) {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not found',
        message: [
          'Provider not found'
        ]
      }, HttpStatus.NOT_FOUND);
    }

    return await this.eventReviewsRepository.find({ where: { eventId } });
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
