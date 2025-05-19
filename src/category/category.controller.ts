import { Body, Controller, Get, Post  } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ResponseCategoryDto } from './dtos/response-category.dto';
import { Roles } from '../decorators/roles.decorator';
import { USerType } from '../user/enum/user-type.emu';
import { CreateCategoryDto } from './mocks/create-category.mock';

@Roles(USerType.ADMIN, USerType.USER)
@Controller('category')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService) { }
  
  @Get()
  async findAll(): Promise<ResponseCategoryDto[]> {
    return (await this.categoryService.findAll()).map(category => new ResponseCategoryDto(category));
  }

  @Roles(USerType.ADMIN)
  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }
}
