import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questioner, User } from 'src/typeorm/entities';
import { QuestionerService } from './services/questioner.service';
import { QuestionerController } from './controllers/questioner.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Questioner, User])],
  providers: [QuestionerService],
  controllers: [QuestionerController],
  exports: [QuestionerService],
})
export class QuestionerModule {}
