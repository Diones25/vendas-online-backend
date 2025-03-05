import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAddressDto } from './dtos/create-address.dto';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {

  constructor(private readonly addressService: AddressService) {}

  @Post('/:userId')
  @UsePipes(ValidationPipe)
  async createAddress(@Param('userId') userId: number , @Body() createAddressDto: CreateAddressDto) {
    return this.addressService.createAddress(createAddressDto, userId);
  }
}
