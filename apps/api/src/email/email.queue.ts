import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { EMAIL_QUEUE, EmailJobs } from './email.constants';

@Injectable()
export class EmailQueue {
  constructor(
    @InjectQueue(EMAIL_QUEUE)
    private readonly queue: Queue,
  ) {}

  async verifyEmail(data: { email: string; token: string; fullname: string }) {
    await this.queue.add(EmailJobs.VERIFY_EMAIL, data, {
      jobId: `verify-email-${data.email}-${Date.now()}`,
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
      removeOnComplete: 1000,
      removeOnFail: 5000,
    });
  }
}
