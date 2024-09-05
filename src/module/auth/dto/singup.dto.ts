import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum SignupType {
  EMAIL = 'email',
  GOOGLE = 'google',
  APPLE = 'apple',
  FACEBOOK = 'facebook',
}

export class EmailSignupDto {
  @ApiProperty({ description: 'Email address for email login' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @ApiProperty({ description: 'Password for email login' })
  @IsString()
  password: string;
}

export class SocialSignupDto {
  @ApiProperty({ description: 'Google ID for Google login', required: false })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsOptional()
  googleId?: string;

  @ApiProperty({ description: 'Apple ID for Apple login', required: false })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsOptional()
  appleId?: string;

  @ApiProperty({
    description: 'Facebook ID for Facebook login',
    required: false,
  })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsOptional()
  facebookId?: string;
}
