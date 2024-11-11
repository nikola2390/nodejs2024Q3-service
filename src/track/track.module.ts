import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { base } from 'src/db';

@Module({
  controllers: [TrackController],
  providers: [TrackService, { provide: 'Database', useValue: base }],
})
export class TrackModule {}
