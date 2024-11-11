import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { Database } from 'src/db';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, Database],
})
export class AlbumModule {}
