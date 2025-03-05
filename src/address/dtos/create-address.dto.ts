import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateAddressDto {
  @IsString({ message: 'Deve ser uma string' })
  @IsOptional()
  complement: string;

  @IsInt({ message: 'Deve ser um número inteiro' })
  numberAddress: number;

  @IsString({ message: 'Deve ser uma string' })
  cep: string;

  @IsInt({ message: 'Deve ser um número inteiro' })
  cityId: number;
}