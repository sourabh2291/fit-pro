// src/upload/upload.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UploadController } from './controller/upload.controller';
import { UploadService } from './services/upload.service';

@Module({
  imports: [ConfigModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
