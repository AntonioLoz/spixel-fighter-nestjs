import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/models/entities/user.entity';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.service.getAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.getById(id);
  }

  @Get(':username')
  findByUsername(@Param('username') username: string) {
    return this.service.getByUsername(username);
  }

  @Get(':email')
  findByEmail(@Param('email') email: string) {
    return this.service.getByEmail(email);
  }

  @Post()
  public create(@Body() user: User): User {
    this.service.save(user);
    return user;
  }

  @Put(':id')
  async editUser(@Body() user: User, @Param('id', ParseIntPipe) id: number) {
    const toEdit = await this.service.update(id, user);

    return toEdit;
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  removeById(@Param('id', ParseIntPipe) id: number) {
    this.service.removeById(id);
  }
}
