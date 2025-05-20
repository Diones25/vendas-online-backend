import { categoryMock } from "../../category/mocks/category.mock";
import { CreateProductDto } from "../dtos/create-product.dto";

export const createProductMock: CreateProductDto = {
  name: 'Teste',
  categoryId: categoryMock.id,
  price: 1,
  image: 'Teste'
}