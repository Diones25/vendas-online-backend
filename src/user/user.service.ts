import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createPasswordHashed, validatePassword } from '../utils/password';
import { USerType } from './enum/user-type.emu';
import { UpdatePasswordDto } from './dtos/update-password.dto';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.findByEmail(createUserDto.email).catch(() => undefined);

    if (user) {
      throw new BadRequestException('E-mail já registrado');
    }

    const hashedPassword = await createPasswordHashed(createUserDto.password);

    return this.usersRepository.save({
      ...createUserDto,
      typeUser: USerType.USER,
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

  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.findUserById(id);

    const hashedPassword = await createPasswordHashed(updatePasswordDto.newPassword);

    const isMatch = await validatePassword(
      updatePasswordDto.lastPassword,
      user.password || ''
    );

    if (!isMatch) {
      throw new BadRequestException('Last password is incorrect');
    }
  
    return this.usersRepository.save({
      ...user,
      password: hashedPassword
    });
  }
}
