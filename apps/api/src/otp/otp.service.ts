import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OtpPurpose } from '../../generated/prisma';
import { generateOtp } from './otp.helper';
import * as argon2 from 'argon2';

@Injectable()
export class OtpService {
  constructor(private readonly prisma: PrismaService) {}

  async send(identifier: string, purpose: OtpPurpose, userId?: string) {
    const code = generateOtp();

    const codeHash = await argon2.hash(code);

    // Remove previous unused OTPs
    await this.prisma.otp.deleteMany({
      where: {
        identifier,
        purpose,
        verifiedAt: null,
      },
    });

    await this.prisma.otp.create({
      data: {
        identifier,
        userId,
        purpose,
        codeHash,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    // TODO:
    // SMS Provider
    // Email Provider

    console.log(`OTP: ${code}`);

    return {
      message: 'OTP sent successfully',
    };
  }

  async verify(identifier: string, purpose: OtpPurpose, code: string) {
    const otp = await this.prisma.otp.findFirst({
      where: {
        identifier,
        purpose,
        verifiedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!otp) {
      throw new BadRequestException('OTP not found.');
    }

    if (otp.expiresAt < new Date()) {
      throw new BadRequestException('OTP has expired.');
    }

    if (otp.attempts >= 5) {
      throw new UnauthorizedException(
        'Maximum verification attempts exceeded.',
      );
    }

    const valid = await argon2.verify(code, otp.codeHash);

    await this.prisma.otp.update({
      where: {
        id: otp.id,
      },
      data: {
        attempts: {
          increment: 1,
        },
      },
    });

    if (!valid) {
      throw new UnauthorizedException('Invalid OTP.');
    }

    await this.prisma.otp.update({
      where: {
        id: otp.id,
      },
      data: {
        verifiedAt: new Date(),
      },
    });

    return true;
  }
}
