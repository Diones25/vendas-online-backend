import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

import { hash } from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const salt = 10;

    const hashedPassword = await hash(createUserDto.password, salt);

    return this.usersRepository.save({
      ...createUserDto,
      typeUser: 1,
      password: hashedPassword
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }
}
