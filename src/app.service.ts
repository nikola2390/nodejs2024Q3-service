import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Application started on port ${process.env.PORT}`;
  }
}
