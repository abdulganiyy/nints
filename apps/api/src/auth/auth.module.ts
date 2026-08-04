import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { EmailModule } from '../email/email.module';
import { WalletModule } from '../wallet/wallet.module';
import { VirtualAccountModule } from '../virtualaccount/virtualaccount.module';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
    UserModule,
    EmailModule,
    WalletModule,
    VirtualAccountModule,
    PaymentModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
