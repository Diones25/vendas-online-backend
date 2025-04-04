import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAddressDto } from './dtos/create-address.dto';
import { AddressService } from './address.service';
import { Roles } from '../decorators/roles.decorator';
import { USerType } from '../user/enum/user-type.emu';
import { UserId } from '../decorators/user-id-decorator';

@Controller('address')
export class AddressController {

  constructor(private readonly addressService: AddressService) {}

  @Roles(USerType.USER)
  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(@UserId() userId: number, @Body() createAddressDto: CreateAddressDto) {
    return this.addressService.createAddress(createAddressDto, userId);
  }
}
