import { CategoryEntity } from "../entities/category.entity";

export class ResponseCategoryDto {
  id: number;
  name: string;

  constructor(category: CategoryEntity) {
    this.id = category.id;
    this.name = category.name;
  }
}