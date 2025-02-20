import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './interfaces/user.interface';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  private users: User[] = [];

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = 10;

    const hashedPassword = await hash(createUserDto.password, salt);

    const user = {
      ...createUserDto,
      password: hashedPassword,
      id: this.users.length + 1,
    }

    this.users.push(user);

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }
}
