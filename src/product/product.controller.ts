import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { USerType } from 'src/user/enum/user-type.emu';
import { ProductService } from './product.service';
import { ResponseProductDto } from './dtos/response-product.dto';
import { CreateProductDto } from './dtos/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }
  
  @Roles(USerType.ADMIN, USerType.USER)
  @Get()
  async findAll() {
    return (await this.productService.findAll()).map(product => new ResponseProductDto(product));
  }

  @Roles(USerType.ADMIN)
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Roles(USerType.ADMIN)
  @Delete(":id")
  async remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}
