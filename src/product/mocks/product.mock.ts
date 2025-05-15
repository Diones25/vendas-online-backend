import { categoryMock } from "../../category/mocks/category.mock";
import { ProductEntity } from "../entities/product.entity";

export const productMock: ProductEntity = {
  id: 1,
  name: 'Teste',
  categoryId: categoryMock.id,
  price: 1,
  image: 'Teste',
  createdAt: new Date(),
  updatedAt: new Date()
}