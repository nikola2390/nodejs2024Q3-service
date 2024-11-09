import { Injectable } from '@nestjs/common';
import { User } from './interfaces/interfaces';
import { CreateUserDto } from './user/dto/create-user.dto';

@Injectable()
export class Database {
  private users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }

  createUser(createUserDto: CreateUserDto): any {
    const timestamp = Date.now();

    const newUser: User = {
      id: crypto.randomUUID(),
      ...createUserDto,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.users.push(newUser);
    const returnedUser = Object.fromEntries(
      Object.entries(newUser).filter((item) => item[0] !== 'password'),
    );

    return returnedUser;
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  getUser(id: string): any {
    let returnedUser: any;
    const user = this.users.find((user) => user.id === id);

    if (user) {
      returnedUser = Object.fromEntries(
        Object.entries(user).filter((item) => item[0] !== 'password'),
      );
    }

    return returnedUser;
  }
}
