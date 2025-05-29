import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dtos/create-cart.dto';

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>
  ) { }
  
  async verifyActiveCart(userId: number) {
    const cart = await this.cartRepository.findOne({
      where: {
        userId
      }
    });

    if (!cart) {
      throw new NotFoundException(`Carrinho com userId ${userId} não encontrado`);
    }

    return cart;
  }

  async createCart(userId: number) {
    return this.cartRepository.save({
      active: true,
      userId
    });
  }
  
  async insertProductInCart(createCartDto: CreateCartDto, userId: number) {
    const cart = await this.verifyActiveCart(userId).catch(async () => {
      return this.createCart(userId)
    });


    return cart;
  }
}
