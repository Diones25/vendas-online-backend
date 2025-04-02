import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';
import { validatePassword } from '../utils/password';
import { LoginPayload } from './dtos/loginPayload.dto';
import { ResponseUserDto } from '../user/dtos/response-user.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async login(loginDto: LoginDto) {
    const user: UserEntity | undefined = await this.userService.findByEmail(loginDto.email).catch(() => undefined);
    
    const isMatch = await validatePassword(loginDto.password, user?.password || '');

    if (!user || !isMatch) {
      throw new NotFoundException(`Email ou senha inválidos`);
    }
    return {
      accessToken: this.jwtService.sign({ ...new LoginPayload(user) }), 
      user: new ResponseUserDto(user),
    };
  }
}
 