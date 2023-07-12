import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { EmailDataDto } from '../dto/email-data.dto';

export class MailgunEmail {
  constructor(private readonly configService: ConfigService) {}

  async sendMailgun(emailDataDto: EmailDataDto) {
    const mailgun = new Mailgun(FormData);
    const client = mailgun.client({
      username: 'api',
      key: this.configService.get<string>('MAILGUN_PRIVATE_API_KEY'),
      url: 'https://api.eu.mailgun.net',
      public_key: this.configService.get<string>('MAILGUN_PUBLIC_API_KEY'),
    });

    const result = await client.messages
      .create('flokkids.com', {
        from: `${
          emailDataDto.senderName ? emailDataDto.senderName : 'Flok Kids'
        } <${this.configService.get<string>('FK_SOURCE_EMAIL')}>`, // sender address
        sender: `${this.configService.get<string>('FK_SOURCE_EMAIL')}`,
        to: `${emailDataDto.toAddresses ? emailDataDto.toAddresses : []}`, // list of receivers
        cc: `${emailDataDto.ccAddresses ? emailDataDto.ccAddresses : []}`,
        bcc: `${emailDataDto.bccAddresses ? emailDataDto.bccAddresses : []}`,
        'h:Reply-To': `${
          emailDataDto.replyToAddresses &&
          emailDataDto.replyToAddresses.length > 0
            ? emailDataDto.replyToAddresses
            : []
        }`,
        subject: emailDataDto.subject, // Subject line
        html: `${emailDataDto.body}`, // html body
      })
      .then((res) => {
        console.log(res.id);
        return res;
      })
      .catch((err) => {
        console.error(err);
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            error: err,
          },
          HttpStatus.BAD_REQUEST
        );
      });

    return result;
  }
}
