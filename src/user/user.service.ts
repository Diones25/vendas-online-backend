import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

import { hash } from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createPasswordHashed } from 'src/utils/password';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const salt = 10;

    const hashedPassword = await createPasswordHashed(createUserDto.password);

    return this.usersRepository.save({
      ...createUserDto,
      typeUser: 1,
      password: hashedPassword
    });
  }

  async getUserByIdUsingRelations(userId: number) {
    return this.usersRepository.findOne({
      where: {
        id: userId
      },
      relations: {
        addresses: {
          city: {
            state: true
          }
        }
      }
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find({
      relations: ['addresses']
    });
  }

  async findUserById(userId: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new NotFoundException(`Usuário com o id ${userId} não encontrado`);
    }

    return user;
  }

  async findByEmail(email: string){
    const user = await this.usersRepository.findOne({
      where: {
        email
      }
    });

    if (!user) {
      throw new NotFoundException(`Usuário com o email ${email} não encontrado`);
    }

    return user;
  }
}
