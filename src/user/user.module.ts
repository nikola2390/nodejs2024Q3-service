import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { base } from 'src/db';

@Module({
  controllers: [UserController],
  providers: [UserService, { provide: 'Database', useValue: base }],
})
export class UserModule {}
