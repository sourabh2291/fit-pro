import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHmac, randomBytes } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessToken } from 'src/typeorm/entities/accessToken.entity';
import { User } from 'src/typeorm/entities';

@Injectable()
export class TokenService {
  private readonly secret = process.env.JWT_SECRET;
  private readonly tokenExpiry = 3600000; // 1 hour in milliseconds

  constructor(
    @InjectRepository(AccessToken)
    private readonly accessTokenRepository: Repository<AccessToken>,
  ) {}

  generateToken(user: User): string {
    const payload = JSON.stringify({ userId: user.id, email: user.email });
    const header = JSON.stringify({ alg: 'HS256', typ: 'JWT' });
    const base64Header = Buffer.from(header).toString('base64url');
    const base64Payload = Buffer.from(payload).toString('base64url');
    const signature = createHmac('sha256', this.secret)
      .update(`${base64Header}.${base64Payload}`)
      .digest('base64url');

    return `${base64Header}.${base64Payload}.${signature}`;
  }

  async saveAccessToken(user: User, token: string): Promise<void> {
    const accessToken = new AccessToken();
    accessToken.token = token;
    accessToken.user = user;
    accessToken.expiresAt = new Date(Date.now() + this.tokenExpiry);
    await this.accessTokenRepository.save(accessToken);
  }

  verifyToken(token: string): any {
    const [header, payload, signature] = token.split('.');

    const validSignature = createHmac('sha256', this.secret)
      .update(`${header}.${payload}`)
      .digest('base64url');

    if (signature !== validSignature) {
      throw new UnauthorizedException('Invalid token');
    }

    const decodedPayload = Buffer.from(payload, 'base64url').toString('utf8');
    return JSON.parse(decodedPayload);
  }
}
