import { Injectable, Logger } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class EmailService {
  private nodemailerTransport: Mail;

  constructor(private readonly configService: ConfigService) {
    const smtpConfig = {
      host: configService.get('EMAIL_SERVICE'),
      port: 465,
      secure: true,
      auth: {
        user: configService.get('EMAIL_USER'),
        pass: configService.get('EMAIL_PASSWORD'),
      },
    };
    this.nodemailerTransport = createTransport(smtpConfig);
  }

  async sendMail(options: Mail.Options) {
    return await this.nodemailerTransport.sendMail(options);
  }
}
