import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from './mocks/product.mock';
import { createProductMock } from './mocks/create-product.mock';
import { CategoryService } from '../category/category.service';
import { categoryMock } from '../category/mocks/category.mock';
import { NotFoundException } from '@nestjs/common';
import { removeProductMock } from './mocks/remove-product.mock';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<ProductEntity>;
  let categoryService: CategoryService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([productMock]),
            findOneBy: jest.fn().mockResolvedValue(productMock),
            save: jest.fn().mockResolvedValue(productMock),
            delete: jest.fn().mockResolvedValue(removeProductMock)
          } 
        },
        {
          provide: CategoryService,
          useValue: {
            findCategoryById: jest.fn().mockResolvedValue(categoryMock)
          }
        }
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity));
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  it('should return all products', async() => {
    const products = await service.findAll();
    expect(productMock).toEqual(productMock);
  });

  it('should return error if products empty', async () => {
    jest.spyOn(productRepository, 'find').mockResolvedValue([]);
    expect(service.findAll()).rejects.toThrowError();
  });

  it('should return error in exception', async () => {
    jest.spyOn(productRepository, 'find').mockRejectedValue(new Error());
    expect(service.findAll()).rejects.toThrowError();
  });

  it('should return product after insert in DB', async () => {
    const product = await service.create(createProductMock);
    expect(product).toEqual(productMock);
  });

  it('should return product after insert in DB', async () => {
    const product = await service.create(createProductMock);
    expect(product).toEqual(productMock);
  });

  it('should return product in find by id', async () => {
    const product = await service.findProductById(productMock.id);
    expect(product).toEqual(productMock);
  });

  it('should return error in product not found', async () => {
    jest.spyOn(productRepository, 'findOneBy').mockRejectedValue(new NotFoundException());
    expect(service.findProductById(productMock.id)).rejects.toThrowError();
  });

  it('should return deleted true in delete product by id', async () => {
    const product = await service.remove(productMock.id);
    expect(product).toEqual(removeProductMock);
  });

});
