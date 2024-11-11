import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { Database } from 'src/db';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, Database],
})
export class ArtistModule {}
