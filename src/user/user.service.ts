import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Database } from 'src/db';

@Injectable()
export class UserService {
  constructor(private db: Database) {}

  create(createUserDto: CreateUserDto) {
    return this.db.createUser(createUserDto);
  }

  findAll() {
    return this.db.getAllUsers();
  }

  findOne(id: string) {
    const user = this.db.getUser(id);

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not exist`);
    }

    return user;
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    this.findOne(id);
    return this.db.updateUser(id, updatePasswordDto);
  }

  delete(id: string) {
    this.findOne(id);
    this.db.deleteUser(id);
  }
}
