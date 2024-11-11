import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { base } from 'src/db';

@Module({
  controllers: [FavsController],
  providers: [FavsService, { provide: 'Database', useValue: base }],
})
export class FavsModule {}
