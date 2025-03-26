import { ResponseUserDto } from 'src/user/dtos/response-user.dto';

export interface ReturnLogin {
  user: ResponseUserDto;
  accessToken: string;
}