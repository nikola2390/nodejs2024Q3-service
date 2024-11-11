import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Database } from 'src/db';
import { Track } from 'src/interfaces/interfaces';

@Injectable()
export class TrackService {
  constructor(private db: Database) {}

  create(createTrackDto: CreateTrackDto) {
    return this.db.createTrack(createTrackDto);
  }

  findAll(): Track[] {
    return this.db.getAllTracks();
  }

  findOne(id: string) {
    const track = this.db.getTrack(id);

    if (!track) {
      throw new NotFoundException(`User with id: ${id} not exist`);
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    this.findOne(id);
    return this.db.updateTrack(id, updateTrackDto);
  }

  delete(id: string) {
    this.findOne(id);
    this.db.deleteTrack(id);
  }
}
