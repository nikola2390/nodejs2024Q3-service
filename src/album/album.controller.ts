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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { StatusCodes } from 'http-status-codes';

import { validate as validateUUID } from 'uuid';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @HttpCode(StatusCodes.CREATED)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    const { name, year } = createAlbumDto;

    if (
      !name ||
      !year ||
      typeof name !== 'string' ||
      typeof year !== 'number'
    ) {
      throw new BadRequestException(`Missing required fields`);
    }

    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!validateUUID(id)) {
      throw new BadRequestException(`Album id: ${id} is not valid`);
    }

    return this.albumService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    if (!validateUUID(id)) {
      throw new BadRequestException(`Album id: ${id} is not valid`);
    }

    const { name, year, artistId } = updateAlbumDto;

    if (
      (name && typeof name !== 'string') ||
      (year && typeof year !== 'number') ||
      (artistId && typeof artistId !== 'string')
    ) {
      throw new BadRequestException(`Missing required fields`);
    }

    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  delete(@Param('id') id: string) {
    if (!validateUUID(id)) {
      throw new BadRequestException(`Album id: ${id} is not valid`);
    }

    return this.albumService.delete(id);
  }
}
