import { ResponseUserDto } from '../../user/dtos/response-user.dto';

export interface ReturnLogin {
  user: ResponseUserDto;
  accessToken: string;
}