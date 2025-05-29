import { Body, Controller, Post } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { USerType } from 'src/user/enum/user-type.emu';
import { CartService } from './cart.service';
import { CreateCartDto } from './dtos/create-cart.dto';
import { UserId } from 'src/decorators/user-id-decorator';

@Roles(USerType.USER, USerType.ADMIN)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }
  
  @Post()
  async createCart(@Body() createCartDto: CreateCartDto, @UserId() userId: number) {
    return this.cartService.insertProductInCart(createCartDto, userId);
  }
}
