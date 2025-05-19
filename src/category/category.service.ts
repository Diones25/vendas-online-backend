import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './mocks/create-category.mock';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) { }
  
  async findAll(): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.find();

    if (!categories || categories.length === 0) {
      throw new NotFoundException('Categories not found');
    }
    return categories
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    await this.findCategoryByName(createCategoryDto.name);
    return this.categoryRepository.save(createCategoryDto);
  }

  async findCategoryById(id: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: {
        id
      }
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async findCategoryByName(name: string) {
    const category = await this.categoryRepository.findOne({
      where: {
        name
      }
    });

    if (category) {
      throw new BadRequestException(`Category ${name} already exists`);
    }
    return false;
  }
}
