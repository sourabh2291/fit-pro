import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthProvider, User } from 'src/typeorm/entities';
import { EmailSignupDto } from '../dto/singup.dto';
import { ForgotPasswordDto, OAuthSignupDto, ResetPasswordDto, SignInDto, SignInWithOAuthDto, VerifyOtpDto } from '../dto/auth.dto';
import { TokenService } from './token.service';
import { OtpService } from 'src/utility/ses.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly tokenService: TokenService,
    private readonly emailService: OtpService,
  ) { }

  async signupWithEmail(dto: EmailSignupDto): Promise<any> {
    const { email, password } = dto;

    // Check if the user already exists
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with inactive status (not verified)
    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      authProvider: AuthProvider.EMAIL,
      isActive: false,  // Set to inactive initially
    });

    await this.userRepository.save(newUser);

    const otp = await this.generateOtp();
    newUser.otp = otp;
    newUser.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry
    await this.userRepository.save(newUser);

    await this.emailService.sendOtpEmail(email, otp);

    return { message: `OTP sent to ${email}` };
  }

  async signupWithOAuth(dto: OAuthSignupDto): Promise<User> {
    const { email, authProvider } = dto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const newUser = this.userRepository.create({
      email,
      authProvider,
    });

    return this.userRepository.save(newUser);
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string; userId: number; email: string }> {
    const { email, password } = signInDto;
  
    const user = await this.userRepository.findOne({ where: { email } });
  
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const token = this.tokenService.generateToken(user);
    await this.tokenService.saveAccessToken(user, token);
  
    return {
      accessToken: token,
      userId: user.id,
      email: user.email,
    };
  }
  
  async signInWithOauth(
    signInDto: SignInWithOAuthDto,
  ): Promise<{ accessToken: string; userId: number; email: string }> {
    const { email, authProvider } = signInDto;
  
    const user = await this.userRepository.findOne({ where: { email } });
  
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    if (user.authProvider === AuthProvider.EMAIL) {
      throw new UnauthorizedException('Password required for email sign-in');
    }
  
    if (user.authProvider !== authProvider) {
      throw new UnauthorizedException(
        `Please sign in with ${user.authProvider}`,
      );
    }
  
    const token = this.tokenService.generateToken(user);
    await this.tokenService.saveAccessToken(user, token);
  
    return {
      accessToken: token,
      userId: user.id,
      email: user.email,
    };
  }
  
  

  async verifyOtp(dto: VerifyOtpDto): Promise<{ accessToken: string }> {
    const { email, otp } = dto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || user.otp !== otp || user.otpExpiresAt < new Date()) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    user.isActive = true;
    user.otp = null; 
    user.otpExpiresAt = null;
    await this.userRepository.save(user);

    const token = this.tokenService.generateToken(user);
    await this.tokenService.saveAccessToken(user, token);

    return { accessToken: token };
  }

  async requestPasswordReset(dto: ForgotPasswordDto): Promise<void> {
    const { email } = dto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const otp = await this.generateOtp();
    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); 
    await this.userRepository.save(user);

    await this.emailService.sendOtpEmail(email, otp);
  }

  async resetPassword(dto: ResetPasswordDto): Promise<void> {
    const { email, otp, newPassword } = dto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || user.otp !== otp || user.otpExpiresAt < new Date()) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = null; 
    user.otpExpiresAt = null;
    await this.userRepository.save(user);
  }


  async  generateOtp(): Promise<any> {
    return Math.floor(100000 + Math.random() * 900000).toString(); 
  }


  async sendOtp(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const otp = await this.generateOtp();
    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry
    await this.userRepository.save(user);

    await this.emailService.sendOtpEmail(email, otp);
  }

  

}
