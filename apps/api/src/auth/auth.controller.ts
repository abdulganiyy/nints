import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from '../common/guards/jwt.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const { accessToken, user } = await this.authService.register(registerDto);

    return { user, accessToken };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { accessToken, user } = await this.authService.login(loginDto);

    return { user, accessToken };
  }

  @Post('verify-email')
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.authService.verifyEmail(
      verifyEmailDto.email,
      verifyEmailDto.otp,
    );
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPaasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPaasswordDto.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.password,
    );
  }

  @Post('resend-verification')
  async resendVerification(
    @Body() resendEmailVerificationDto: { email: string },
  ) {
    return this.authService.resendEmailOtp(resendEmailVerificationDto.email);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  getMe(@Req() req: any) {
    return this.authService.me(req.user.email);
  }
}
