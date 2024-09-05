import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  @IsString()
  @MinLength(8)
  password: string;
}

export class FacebookLoginDto {
  @ApiProperty()
  @IsString()
  facebookId: string;
}

export class GoogleLoginDto {
  @ApiProperty()
  @IsString()
  googleId: string;

  // Add other fields if needed (e.g., accessToken)
}

export class AppleIdLoginDto {
  @ApiProperty()
  @IsString()
  appleId: string;

  // Add other fields if needed (e.g., accessToken)
}
