import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email).catch(() => undefined);

    if (!user) {
      throw new NotFoundException(`Email ou senha inválidos`);
    }
    
    const isMatch = await compare(loginDto.password, user.password);

    if (!isMatch) {
      throw new NotFoundException(`Email ou senha inválidos`);
    }

    const accessToken = this.jwtService.sign({
      id: user.id,
      name: user.name,
      email: user.email,
    });
    

    return {
      accessToken: accessToken,
      user: {
        id: user.id,
        email: user.email,
      }
    };
  }
}
 