import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { QuestionerService } from '../services/questioner.service';
import { Questioner } from 'src/typeorm/entities';
import {
  CreateQuestionerDto,
  UpdateQuestionerDto,
} from '../dto/create-quest.dto';

@ApiTags('questioner')
@Controller('questioner')
export class QuestionerController {
  private readonly logger = new Logger(QuestionerController.name);

  constructor(private readonly questionerService: QuestionerService) {}

  @Post(':userId')
  async create(
    @Body() createQuestionerDto: CreateQuestionerDto,
    @Param('userId') userId: number,
  ): Promise<Questioner> {
    this.logger.log('Creating a new questioner');
    return this.questionerService.create(userId, createQuestionerDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of questioners',
    type: [Questioner],
  })
  async findAll(): Promise<Questioner[]> {
    this.logger.log('Retrieving all questioners');
    return this.questionerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Questioner> {
    this.logger.log(`Retrieving questioner with ID ${id}`);
    return this.questionerService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateQuestionerDto: UpdateQuestionerDto,
  ): Promise<Questioner> {
    this.logger.log(`Updating questioner with ID ${id}`);
    return this.questionerService.update(id, updateQuestionerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    this.logger.log(`Removing questioner with ID ${id}`);
    return this.questionerService.remove(id);
  }

  @Get('user/:userId')
  async getQuestionerByUserId(@Param('userId') userId: number) {
    try {
      const questioner = await this.questionerService.findByUserId(userId);
      return questioner;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
