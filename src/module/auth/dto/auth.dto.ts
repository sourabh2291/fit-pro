import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AuthProvider } from 'src/typeorm/entities';

export class EmailSignupDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'strongpassword123',
    description: 'The password for the user account',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class OAuthSignupDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    enum: AuthProvider,
    description: 'The authentication provider (google, apple, facebook)',
  })
  @IsEnum(AuthProvider)
  authProvider: AuthProvider;
}

export class SignInDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'strongpassword123',
    description: 'The password for the user account',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignInWithOAuthDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    enum: AuthProvider,
    description: 'The authentication provider (google, apple, facebook)',
  })
  @IsEnum(AuthProvider)
  authProvider: AuthProvider;
}


export class VerifyOtpDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  otp: string;
}


export class ForgotPasswordDto {
  @ApiProperty()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  otp: string;
  @ApiProperty()
  newPassword: string;
}


