import { Controller, Post, Body, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { EmailSignupDto } from '../dto/singup.dto';
import { User } from 'src/typeorm/entities';
import { OAuthSignupDto, SignInDto, SignInWithOAuthDto } from '../dto/auth.dto';

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
}
