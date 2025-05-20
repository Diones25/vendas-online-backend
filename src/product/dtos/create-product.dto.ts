import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {

  @IsString({ message: 'name deve ser uma string' })
  name: string;

  @IsNumber({}, { message: 'price deve ser um número' })
  price: number;

  @IsString({ message: 'image deve ser uma string' })
  image: string;

  @IsNumber({}, { message: 'categoryId deve ser um número' })
  categoryId: number;
}