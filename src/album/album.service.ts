import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Database } from 'src/db';

@Injectable()
export class AlbumService {
  constructor(private db: Database) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.db.createAlbum(createAlbumDto);
  }

  findAll() {
    return this.db.getAllAlbums();
  }

  findOne(id: string) {
    const album = this.db.getAlbum(id);

    if (!album) {
      throw new NotFoundException(`Album with id: ${id} not exist`);
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    this.findOne(id);
    return this.db.updateAlbum(id, updateAlbumDto);
  }

  delete(id: string) {
    this.findOne(id);
    this.db.deleteAlbum(id);
  }
}
