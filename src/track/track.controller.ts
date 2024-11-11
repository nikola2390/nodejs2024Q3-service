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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { StatusCodes } from 'http-status-codes';

import { validate as validateUUID } from 'uuid';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @HttpCode(StatusCodes.CREATED)
  create(@Body() createTrackDto: CreateTrackDto) {
    const { name, duration } = createTrackDto;

    if (
      !name ||
      !duration ||
      typeof name !== 'string' ||
      typeof duration !== 'number'
    ) {
      throw new BadRequestException(`Missing required fields`);
    }

    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!validateUUID(id)) {
      throw new BadRequestException(`Track id: ${id} is not valid`);
    }

    return this.trackService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    if (!validateUUID(id)) {
      throw new BadRequestException(`Track id: ${id} is not valid`);
    }

    const { name, albumId, artistId, duration } = updateTrackDto;

    if (
      (name && typeof name !== 'string') ||
      (albumId && typeof albumId !== 'string') ||
      (artistId && typeof artistId !== 'string') ||
      (duration && typeof duration !== 'number')
    ) {
      throw new BadRequestException(`Missing required fields`);
    }

    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  delete(@Param('id') id: string) {
    if (!validateUUID(id)) {
      throw new BadRequestException(`Track id: ${id} is not valid`);
    }

    return this.trackService.delete(id);
  }
}
