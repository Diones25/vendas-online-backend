import { IsEmail, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";
import { IsCPF } from "class-validator-cpf";

export class CreateUserDto {
  
  @IsString({ message: 'Deve ser uma string' })
  name: string;

  @IsEmail({}, { message: 'Deve ser um email' })
  email: string;

  @IsPhoneNumber('BR', { message: 'Deve ser um número de telefone válido' })
  phone: string;

  @IsCPF({ message: 'Deve ser um CPF válido' })
  cpf: string;

  @IsString({ message: 'Deve ser uma string' })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  },{ message: 'A senha não é forte o suficiente' })
  password: string;
}