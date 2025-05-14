import { Test, TestingModule } from "@nestjs/testing";
import { CategoryService } from "./category.service";
import { Repository } from "typeorm";
import { CategoryEntity } from "./entities/category.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { categoryMock } from "./mocks/category.mock";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { CreateCategoryMock } from "./dtos/create-category.dto";

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<CategoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, {
        provide: getRepositoryToken(CategoryEntity),
        useValue: {
          findOne: jest.fn().mockResolvedValue(categoryMock),
          find: jest.fn().mockResolvedValue([categoryMock]),
          save: jest.fn().mockResolvedValue(categoryMock),
        }
      }],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<CategoryEntity>>(getRepositoryToken(CategoryEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryRepository).toBeDefined();
  }); 

  it('should return list category', async () => {
    const categories = await service.findAll();
    expect(categories).toEqual([categoryMock]);
  });

  it('should return error in list category empty', async () => {
    jest.spyOn(categoryRepository, 'find').mockResolvedValue([]);
    expect(service.findAll()).rejects.toThrowError();
  });

  it('should return error in list category exception', async () => {
    jest.spyOn(categoryRepository, 'find').mockRejectedValue(new NotFoundException());
    expect(service.findAll()).rejects.toThrowError();
  });

  it('should return error if exist category name', async () => {
    jest.spyOn(categoryRepository, 'save').mockRejectedValue(new BadRequestException());
    expect(service.create(CreateCategoryMock)).rejects.toThrowError();
  });

  it('should return category after save', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(null);
    const category = await service.create(CreateCategoryMock);
    expect(category).toEqual(categoryMock);
  });

  it('should return error in exeption', async () => {
    jest.spyOn(categoryRepository, 'save').mockRejectedValue(new BadRequestException());
    expect(service.create(CreateCategoryMock)).rejects.toThrowError();
  });

  it('should return category in find by name', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(null);
    const category = await service.findCategoryByName(CreateCategoryMock.name);
    expect(category).toBeFalsy();
  });

  it('should return error if category in find by name empty', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockRejectedValue(new NotFoundException());
    expect(service.findCategoryByName(CreateCategoryMock.name)).rejects.toThrowError();
  });
});
