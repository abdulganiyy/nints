import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { EMAIL_QUEUE, EmailJobs } from './email.constants';
import { EmailService } from './email.interface';

@Processor(EMAIL_QUEUE)
export class EmailWorker extends WorkerHost {
  constructor(private readonly emailService: EmailService) {
    super();
  }

  async process(job: Job) {
    switch (job.name) {
      case EmailJobs.VERIFY_EMAIL:
        return this.emailService.sendEmail({
          to: job.data.email,
          subject: 'Verify Your Email',
          template: 'verify-email',
          context: {
            appName: 'Nints',
            name: job.data.fullname,
            verificationUrl: `${process.env.FRONTEND_URL}/verify-email?token=${job.data.token}&email=${job.data.email}`,
            expiryMinutes: '10',
            supportEmail: 'support@nints.com',
            year: new Date().getFullYear(),
          },
        });
    }
  }
}
