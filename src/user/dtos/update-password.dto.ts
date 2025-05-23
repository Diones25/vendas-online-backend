import { IsString, IsStrongPassword } from "class-validator";

export class UpdatePasswordDto {

  @IsString({ message: 'Deve ser uma string' })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  },{ message: 'A senha não é forte o suficiente' })
  newPassword: string;

  @IsString({ message: 'Deve ser uma string' })
  lastPassword: string;
}