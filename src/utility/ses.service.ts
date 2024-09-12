// otp.service.ts
import { Injectable } from '@nestjs/common';
import { SES } from 'aws-sdk';

@Injectable()
export class OtpService {
  private ses: SES;

  constructor() {
    this.ses = new SES({
      region: 'ap-south-1', // Replace with your AWS region
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async sendOtpEmail(to: string, otp: string): Promise<void> {
    const params: SES.Types.SendEmailRequest = {
      Source: 'rai97sourabh@gmail.com', // Replace with your verified email
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Data: 'Your OTP Code',
        },
        Body: {
          Text: {
            Data: `Your OTP code is ${otp}`,
          },
        },
      },
    };

    try {
      await this.ses.sendEmail(params).promise();
    } catch (error) {
      console.error('Error sending OTP email:', error);
      throw new Error('Failed to send OTP email');
    }
  }
}
