import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { PaymentModule } from './payment/payment.module';
import { WalletModule } from './wallet/wallet.module';
import { VirtualAccountModule } from './virtualaccount/virtualaccount.module';
import { SmsModule } from './sms/sms.module';
import { OtpModule } from './otp/otp.module';
import { QueueModule } from './queue/queue.module';
import { VtuModule } from './vtu/vtu.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CommonModule,
    UserModule,
    AuthModule,
    PrismaModule,
    EmailModule,
    PaymentModule,
    WalletModule,
    VirtualAccountModule,
    SmsModule,
    OtpModule,
    QueueModule,
    VtuModule,
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
