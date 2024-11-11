import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Database } from 'src/db';

@Injectable()
export class FavsService {
  constructor(@Inject('Database') private db: Database) {}

  findAll() {
    return this.db.getAllFavorites();
  }

  addTrackToFavs(id: string) {
    const track = this.db.getTrack(id);

    if (!track) {
      throw new UnprocessableEntityException(`Track with id: ${id} not exist`);
    }

    this.db.addTrackToFavs(id);
  }

  addAlbumToFavs(id: string) {
    const album = this.db.getAlbum(id);

    if (!album) {
      throw new UnprocessableEntityException(`Album with id: ${id} not exist`);
    }

    this.db.addAlbumToFavs(id);
  }

  addArtistToFavs(id: string) {
    const artist = this.db.getArtist(id);

    if (!artist) {
      throw new UnprocessableEntityException(`Artist with id: ${id} not exist`);
    }

    this.db.addArtistToFavs(id);
  }

  deleteTrackFromFavs(id: string) {
    if (!this.db.isTrackFavorite(id)) {
      throw new NotFoundException(`Favorite track with id: ${id} not exist`);
    }

    this.db.deleteTrackFromFavs(id);
  }

  deleteAlbumFromFavs(id: string) {
    if (!this.db.isAlbumFavorite(id)) {
      throw new NotFoundException(`Favorite album with id: ${id} not exist`);
    }

    this.db.deleteAlbumFromFavs(id);
  }

  deleteArtistFromFavs(id: string) {
    if (!this.db.isArtistFavorite(id)) {
      throw new NotFoundException(`Favorite artist with id: ${id} not exist`);
    }

    this.db.deleteArtistFromFavs(id);
  }
}
