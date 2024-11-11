import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { base } from 'src/db';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, { provide: 'Database', useValue: base }],
})
export class AlbumModule {}
