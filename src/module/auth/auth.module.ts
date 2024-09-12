import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AccessToken } from 'src/typeorm/entities/accessToken.entity';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from './services/token.service';
import { OtpService } from 'src/utility/ses.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, AccessToken])],
  providers: [AuthService, TokenService, OtpService],
  controllers: [AuthController],
})
export class AuthModule {}
