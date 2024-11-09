import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { StatusCodes } from 'http-status-codes';

import { validate as validateUUID } from 'uuid';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(StatusCodes.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;

    if (
      !login ||
      !password ||
      typeof login !== 'string' ||
      typeof password !== 'string'
    ) {
      throw new BadRequestException(`Missing required fields`);
    }

    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!validateUUID(id)) {
      throw new BadRequestException(`User id: ${id} is not valid`);
    }

    return this.userService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    if (!validateUUID(id)) {
      throw new BadRequestException(`User id: ${id} is not valid`);
    }
    const { newPassword, oldPassword } = updatePasswordDto;

    if (
      !newPassword ||
      !oldPassword ||
      typeof newPassword !== 'string' ||
      typeof oldPassword !== 'string'
    ) {
      throw new BadRequestException(`Missing required fields`);
    }

    return this.userService.update(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  delete(@Param('id') id: string) {
    if (!validateUUID(id)) {
      throw new BadRequestException(`User id: ${id} is not valid`);
    }

    return this.userService.delete(id);
  }
}
