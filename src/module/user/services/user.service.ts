// import { Injectable, Logger, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from 'src/typeorm/entities';
// import { Repository } from 'typeorm';
// import { CreateUserDto, UpdateUserDto } from '../dto/create-user.dto';

// @Injectable()
// export class UserService {
//     private readonly logger = new Logger(UserService.name);
//   constructor(
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//   ) {}

//   async create(createUserDto: CreateUserDto): Promise<User> {
//     const user = this.userRepository.create(createUserDto);
//     return this.userRepository.save(user);
//   }

//   async findAll(): Promise<User[]> {
//     return this.userRepository.find();
//   }

//   async findOne(id: number): Promise<User> {
//     const user = await this.userRepository.findOne({ where: { id } });
//     if (!user) {
//       throw new NotFoundException(`User with ID ${id} not found`);
//     }
//     return user;
//   }

//   async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
//     await this.userRepository.update(id, updateUserDto);
//     return this.findOne(id);
//   }

//   async findByEmail(email: string): Promise<User> {
//     return this.userRepository.findOne({ where: { email } });
//   }

//   async remove(id: number): Promise<void> {
//     const user = await this.findOne(id);
//     await this.userRepository.remove(user);
//   }

//   async findByGoogleId(googleId: string): Promise<User | undefined> {
//     return this.userRepository.findOne({ where: { googleId } });
//   }

//   async findOrCreate(createUserDto: Partial<User>): Promise<User> {
//     // Check if a user with the Google ID exists
//     let user = await this.findByGoogleId(createUserDto.googleId);

//     if (user) {
//       // If the user exists, update their status
//       user.status = true;
//       user.firstName = createUserDto.firstName ?? user.firstName;
//       user.lastName = createUserDto.lastName ?? user.lastName;
//       user.email = createUserDto.email ?? user.email;
//       user.phoneNo = createUserDto.phoneNo ?? user.phoneNo;

//       user = await this.userRepository.save(user);
//     } else {
//       // Create a new user
//       user = this.userRepository.create({
//         ...createUserDto,
//         status: true, // Set status to true for Google Sign-In users
//       });
//       user = await this.userRepository.save(user);
//     }

//     return user;
//   }
// }
