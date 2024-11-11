import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { base } from 'src/db';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, { provide: 'Database', useValue: base }],
})
export class ArtistModule {}
