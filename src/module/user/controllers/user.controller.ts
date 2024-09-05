// import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
// import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
// import { UserService } from '../services/user.service';
// import { CreateUserDto, UpdateUserDto } from '../dto/create-user.dto';
// import { User } from 'src/typeorm/entities';

// @ApiTags('users')
// @Controller('users')
// export class UserController {
//     private readonly logger = new Logger(UserController.name);
//   constructor(private readonly userService: UserService) {}

//   @Post()
//   @ApiOperation({ summary: 'Create a new user' })
//   @ApiResponse({ status: 201, description: 'User created successfully', type: User })
//   async create(@Body() createUserDto: CreateUserDto): Promise<User> {
//     return this.userService.create(createUserDto);
//   }

//   @Get()
//   @ApiOperation({ summary: 'Get all users' })
//   @ApiResponse({ status: 200, description: 'List of all users', type: [User] })
//   async findAll(): Promise<User[]> {
//     return this.userService.findAll();
//   }

//   @Get(':id')
//   @ApiOperation({ summary: 'Get a user by ID' })
//   @ApiResponse({ status: 200, description: 'User found', type: User })
//   async findOne(@Param('id') id: number): Promise<User> {
//     return this.userService.findOne(id);
//   }

//   @Patch(':id')
//   @ApiOperation({ summary: 'Update a user by ID' })
//   @ApiResponse({ status: 200, description: 'User updated successfully', type: User })
//   async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
//     return this.userService.update(id, updateUserDto);
//   }

//   @Delete(':id')
//   @ApiOperation({ summary: 'Delete a user by ID' })
//   @ApiResponse({ status: 200, description: 'User deleted successfully' })
//   async remove(@Param('id') id: number): Promise<void> {
//     return this.userService.remove(id);
//   }
// }
