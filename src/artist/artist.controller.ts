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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { StatusCodes } from 'http-status-codes';

import { validate as validateUUID } from 'uuid';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @HttpCode(StatusCodes.CREATED)
  create(@Body() createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto;

    if (
      !name ||
      !grammy ||
      typeof name !== 'string' ||
      typeof grammy !== 'boolean'
    ) {
      throw new BadRequestException(`Missing required fields`);
    }

    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!validateUUID(id)) {
      throw new BadRequestException(`Artist id: ${id} is not valid`);
    }

    return this.artistService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    if (!validateUUID(id)) {
      throw new BadRequestException(`Artist id: ${id} is not valid`);
    }

    const { name, grammy } = updateArtistDto;

    if (
      (name && typeof name !== 'string') ||
      (grammy && typeof grammy !== 'boolean')
    ) {
      throw new BadRequestException(`Invalid updated fields`);
    }

    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  delete(@Param('id') id: string) {
    if (!validateUUID(id)) {
      throw new BadRequestException(`Artist id: ${id} is not valid`);
    }

    return this.artistService.delete(id);
  }
}
