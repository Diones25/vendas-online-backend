import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { ResponseUserDto } from './dtos/response-user.dto';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.userService.findAll();
    return users.map(user => new ResponseUserDto(user));
  }

  @Get(':userId')
  async findUserById(@Param('userId') userId: number): Promise<ResponseUserDto> {
    const user = await this.userService.getUserByIdUsingRelations(userId);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
    }
    return new ResponseUserDto(user);
  }
}
