import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ResponseCategoryDto } from './dtos/response-category.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { USerType } from 'src/user/enum/user-type.emu';

@Roles(USerType.ADMIN, USerType.USER)
@Controller('category')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService) { }
  
  @Get()
  async findAll(): Promise<ResponseCategoryDto[]> {
    return (await this.categoryService.findAll()).map(category => new ResponseCategoryDto(category));
  }
}
