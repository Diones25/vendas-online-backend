import { Body, Controller, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { ResponseUserDto } from './dtos/response-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UserId } from 'src/decorators/user-id-decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { USerType } from './enum/user-type.emu';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Roles(USerType.ADMIN)
  @Get()
  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.userService.findAll();
    return users.map(user => new ResponseUserDto(user));
  }

  @Roles(USerType.ADMIN)
  @Get(':userId')
  async findUserById(@Param('userId') userId: number): Promise<ResponseUserDto> {
    const user = await this.userService.getUserByIdUsingRelations(userId);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
    }
    return new ResponseUserDto(user);
  }

  @Roles(USerType.ADMIN, USerType.USER)
  @Patch()
  async updatePassword(@UserId() id: number, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.userService.updatePassword(id, updatePasswordDto);
  }
}
