import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Database } from 'src/db';

@Injectable()
export class ArtistService {
  constructor(private db: Database) {}

  create(createArtistDto: CreateArtistDto) {
    return this.db.createArtist(createArtistDto);
  }

  findAll() {
    return this.db.getAllArtists();
  }

  findOne(id: string) {
    const artist = this.db.getArtist(id);

    if (!artist) {
      throw new NotFoundException(`User with id: ${id} not exist`);
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    this.findOne(id);
    return this.db.updateArtist(id, updateArtistDto);
  }

  delete(id: string) {
    this.findOne(id);
    this.db.deleteArtist(id);
  }
}
