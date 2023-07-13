import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailDataDto } from './dto/email-data.dto';
import { MailgunEmail } from './platform/mailgun';

@Injectable()
export class EmailsService {
  constructor(private readonly configService: ConfigService) {}

  async sendEmail(emailDataDto: EmailDataDto) {
    return new MailgunEmail(this.configService).sendMailgun(emailDataDto);
  }
}
