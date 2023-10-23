import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDTO } from './dtos/create-user.dto';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async getUsers(@Query('email') email?: string): Promise<User> {
    if (email) return this.userService.getUser({ email });

    return null;
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUser({ id });
  }

  @Post()
  create(@Body() body: CreateUserDTO) {
    return this.userService.create(body);
  }
}
