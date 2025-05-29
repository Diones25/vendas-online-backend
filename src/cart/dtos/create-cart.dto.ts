import { IsNumber } from "class-validator";

export class CreateCartDto {

  @IsNumber({}, { message: 'productId deve ser um número' })
  productId: number;

  @IsNumber({}, { message: 'amount deve ser um número' })
  amount: number;
}