import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { CategoryService } from '../category/category.service';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoryService,
  ) {}
  

  async findAll() {
    const products = await this.productRepository.find();

    if (!products || products.length === 0) {
      throw new NotFoundException('Products not found');
    }

    return products;
  }

  async create(createProductDto: CreateProductDto) {
    await this.categoryService.findCategoryById(createProductDto.categoryId);
    return this.productRepository.save(createProductDto);
  }

  async findProductById(id: number) {
    try {
      const product = await this.productRepository.findOneBy({ id });

      if (!product) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      return product;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error retrieving product with id ${id}: ${error.message}`,
      );
    }
  }

  async remove(id: number) {
    await this.findProductById(id);
    return this.productRepository.delete(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findProductById(id);
    return this.productRepository.update(id, updateProductDto);
  }
}
