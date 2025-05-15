import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { USerType } from 'src/user/enum/user-type.emu';
import { ProductService } from './product.service';
import { ResponseProductDto } from './dtos/response-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }
  
  @Roles(USerType.ADMIN, USerType.USER)
  @Get()
  async findAll() {
    return (await this.productService.findAll()).map(product => new ResponseProductDto(product));
  }
}
