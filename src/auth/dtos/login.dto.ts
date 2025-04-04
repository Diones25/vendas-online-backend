import { IsEmail, IsString } from "class-validator";

export class LoginDto {
  @IsEmail({}, { message: 'Deve ser um email' })
  email: string;

  @IsString({ message: 'Deve ser uma string' })
  password: string;
}