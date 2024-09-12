import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Questioner, User } from 'src/typeorm/entities';
import {
  CreateQuestionerDto,
  UpdateQuestionerDto,
} from '../dto/create-quest.dto';

@Injectable()
export class QuestionerService {
  constructor(
    @InjectRepository(Questioner)
    private readonly questionerRepository: Repository<Questioner>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    userId: number,
    createQuestionerDto: CreateQuestionerDto,
  ): Promise<Questioner> {
    const { ...questionerData } = createQuestionerDto;
  
    // Fetch the user from the database by userId
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['questioner'] });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  
    // Check if the user already has a Questioner
    if (user.questioner) {
      throw new Error(`User with ID ${userId} already has a Questioner.`);
    }
  
    // Create a new questioner
    const questioner = this.questionerRepository.create({
      ...questionerData,
      user, // Associate the user with the questioner
    });
  
    try {
      return await this.questionerRepository.save(questioner);
    } catch (error) {
      console.error('Failed to create a new questioner', error.stack);
      throw new InternalServerErrorException(
        'Failed to create questioner. Please try again later.',
      );
    }
  }
  
  async findAll(): Promise<Questioner[]> {
    return this.questionerRepository.find();
  }

  async findOne(id: number): Promise<Questioner> {
    const questioner = await this.questionerRepository.findOneBy({ id });
    if (!questioner) {
      throw new NotFoundException(`Questioner with ID ${id} not found`);
    }
    return questioner;
  }

  async update(
    id: number,
    updateQuestionerDto: UpdateQuestionerDto,
  ): Promise<Questioner> {
    const questioner = await this.findOne(id);
    Object.assign(questioner, updateQuestionerDto);
    return this.questionerRepository.save(questioner);
  }

  async remove(id: number): Promise<void> {
    const result = await this.questionerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Questioner with ID ${id} not found`);
    }
  }

  async findByUserId(userId: number): Promise<Questioner> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['questioner'], // Ensure the relationship is loaded
      });

      if (!user || !user.questioner) {
        throw new NotFoundException(
          `Questioner for User with ID ${userId} not found`,
        );
      }

      return user.questioner;
    } catch (error) {
      console.error('Failed to find questioner by user ID', error.stack);
      throw new InternalServerErrorException(
        'Failed to find questioner. Please try again later.',
      );
    }
  }
}
