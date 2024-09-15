import { Controller, Post, Body, Logger, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { EmailSignupDto } from '../dto/singup.dto';
import { User } from 'src/typeorm/entities';
import { ForgotPasswordDto, OAuthSignupDto, ResetPasswordDto, SignInDto, SignInWithOAuthDto, VerifyOtpDto } from '../dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('signup/email')
  @ApiOperation({ summary: 'Sign up with email and password' })
  async signupWithEmail(@Body() dto: EmailSignupDto): Promise<User> {
    return this.authService.signupWithEmail(dto);
  }

  @Post('signup/oauth')
  @ApiOperation({ summary: 'Sign up with OAuth (Google, Apple, Facebook)' })
  async signupWithOAuth(@Body() dto: OAuthSignupDto): Promise<User> {
    return this.authService.signupWithOAuth(dto);
  }

  @Post('signin/email')
  @ApiOperation({ summary: 'Sign in with email and password' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async signIn(@Body() dto: SignInDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(dto);
  }

  @Post('signin/cloud')
  @ApiOperation({ summary: 'Sign in with email and password' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async signInWithO(
    @Body() dto: SignInWithOAuthDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signInWithOauth(dto);
  }


  @Post('verify-otp')
  async verifyOtp(@Body() dto: VerifyOtpDto) {
    const token = await this.authService.verifyOtp(dto);
    return token;
  }

  @Post('forgot-password')
  async requestPasswordReset(@Body() dto: ForgotPasswordDto) {
    await this.authService.requestPasswordReset(dto);
    return { message: 'OTP sent for password reset' };
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.authService.resetPassword(dto);
    return { message: 'Password successfully reset' };
  }


  @Post('send-otp/:email')
  async sendOtp(@Param('email') email: string) {
    await this.authService.sendOtp  (email);
    return { message: 'Password successfully reset' };
  }


  



}
