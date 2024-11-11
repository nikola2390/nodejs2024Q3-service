import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { StatusCodes } from 'http-status-codes';

import { validate as validateUUID } from 'uuid';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  addTrackToFavs(@Param('id') id: string) {
    if (!validateUUID(id)) {
      throw new BadRequestException(`Track id: ${id} is not valid`);
    }

    return this.favsService.addTrackToFavs(id);
  }

  @Post('album/:id')
  addAlbumToFavs(@Param('id') id: string) {
    if (!validateUUID(id)) {
      throw new BadRequestException(`Album id: ${id} is not valid`);
    }

    return this.favsService.addAlbumToFavs(id);
  }

  @Post('artist/:id')
  addArtistToFavs(@Param('id') id: string) {
    if (!validateUUID(id)) {
      throw new BadRequestException(`Artist id: ${id} is not valid`);
    }

    return this.favsService.addArtistToFavs(id);
  }

  @Delete('track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteTrackFromFavs(@Param('id') id: string) {
    if (!validateUUID(id)) {
      throw new BadRequestException(`Track id: ${id} is not valid`);
    }

    return this.favsService.deleteTrackFromFavs(id);
  }

  @Delete('album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteAlbumFromFavs(@Param('id') id: string) {
    if (!validateUUID(id)) {
      throw new BadRequestException(`Album id: ${id} is not valid`);
    }

    return this.favsService.deleteAlbumFromFavs(id);
  }

  @Delete('artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteArtistFromFavs(@Param('id') id: string) {
    if (!validateUUID(id)) {
      throw new BadRequestException(`Artist id: ${id} is not valid`);
    }

    return this.favsService.deleteArtistFromFavs(id);
  }
}
