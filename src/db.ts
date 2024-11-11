import { ForbiddenException, Injectable } from '@nestjs/common';
import { Track, User } from './interfaces/interfaces';
import { CreateUserDto } from './user/dto/create-user.dto';
import { UpdatePasswordDto } from './user/dto/update-password.dto';
import { CreateTrackDto } from './track/dto/create-track.dto';
import { UpdateTrackDto } from './track/dto/update-track.dto';

@Injectable()
export class Database {
  private users: User[] = [];
  private tracks: Track[] = [];

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

  updateUser(id: string, updatePasswordDto: UpdatePasswordDto) {
    let user = this.users.find((user) => user.id === id);
    let returnedUser: any;
    const { newPassword, oldPassword } = updatePasswordDto;

    if (user) {
      const index = this.users.indexOf(user);

      if (user.password === oldPassword) {
        user = {
          ...user,
          password: newPassword,
          version: user.version + 1,
          updatedAt: Date.now(),
        };

        this.users[index] = user;

        returnedUser = Object.fromEntries(
          Object.entries(user).filter((item) => item[0] !== 'password'),
        );
      } else {
        throw new ForbiddenException('Operation is forbidden');
      }
    }

    return returnedUser;
  }

  getAllTracks(): Track[] {
    return this.tracks;
  }

  createTrack(createTrackDto: CreateTrackDto): Track {
    const newTrack: Track = {
      id: crypto.randomUUID(),
      ...createTrackDto,
    };

    this.tracks.push(newTrack);

    return newTrack;
  }

  deleteTrack(id: string): void {
    this.tracks = this.tracks.filter((track) => track.id !== id);
  }

  getTrack(id: string): Track {
    return this.tracks.find((track) => track.id === id);
  }

  updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.tracks.find((track) => track.id === id);
    const updatedTrack = {
      ...track,
      ...updateTrackDto,
    };
    const index = this.tracks.indexOf(track);
    this.tracks[index] = updatedTrack;

    return updatedTrack;
  }
}
