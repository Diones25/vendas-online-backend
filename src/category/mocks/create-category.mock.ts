import { IsString } from "class-validator";

export class CreateCategoryDto {
  @IsString({ message: 'Deve ser uma string' })
  name: string;
}