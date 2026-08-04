import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PAYMENT_QUEUE, PaymentJobs } from './payment.constants';
import { PaymentProvider } from './payment.interface';

@Processor(PAYMENT_QUEUE)
export class PaymentWorker extends WorkerHost {
  constructor(private readonly paymentService: PaymentProvider) {
    super();
  }

  async process(job: Job) {
    switch (job.name) {
      case PaymentJobs.PROVISION_VIRTUAL_ACCOUNT:
        return this.paymentService.provisionAccount(job.data.userId);
    }
  }
}
