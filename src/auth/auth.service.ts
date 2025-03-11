import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email).catch(() => undefined);

    if (!user) {
      throw new NotFoundException(`Email ou senha inválidos`);
    }
    
    const isMatch = await compare(loginDto.password, user.password);

    if (!isMatch) {
      throw new NotFoundException(`Email ou senha inválidos`);
    }

    return user;
  }
}
