import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { PAYMENT_QUEUE, PaymentJobs } from './payment.constants';
import { Queue } from 'bullmq';

@Injectable()
export class PaymentQueue {
  constructor(
    @InjectQueue(PAYMENT_QUEUE)
    private readonly queue: Queue,
  ) {}

  async provisionVirtualAccount(userId: string) {
    await this.queue.add(
      PaymentJobs.PROVISION_VIRTUAL_ACCOUNT,
      { userId },
      {
        jobId: `provision-virtual-account-${userId}-${Date.now()}`,
        attempts: 5,
        backoff: {
          type: 'exponential',
          delay: 5000,
        },
        removeOnComplete: 1000,
        removeOnFail: 5000,
      },
    );
  }
}
