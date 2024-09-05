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
import { OAuthSignupDto, SignInDto, SignInWithOAuthDto } from '../dto/auth.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly tokenService: TokenService,
  ) { }

  async signupWithEmail(dto: EmailSignupDto): Promise<User> {
    const { email, password } = dto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      authProvider: AuthProvider.EMAIL,
    });

    return this.userRepository.save(newUser);
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

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
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

    return { accessToken: token };
  }

  async signInWithOauth(
    signInDto: SignInWithOAuthDto,
  ): Promise<{ accessToken: string }> {
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

    return { accessToken: token };
  }

}
