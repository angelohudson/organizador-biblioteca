import { UsersService } from './shared/users.service';
import { Controller, Get, Param, Body, Post, Put } from '@nestjs/common';
import { User } from './model/user';
import { UserDto } from './shared/user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) { }

  @Get()
  async getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<User> {
    return this.usersService.getById(id);
  }

  @Post()
  async create(@Body() user: UserDto): Promise<User> {
    return this.usersService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: UserDto): Promise<User> {
    return this.usersService.update(id, user);
  }
}
