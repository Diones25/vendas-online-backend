import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAddressDto } from './dtos/create-address.dto';
import { AddressService } from './address.service';
import { Roles } from 'src/decorators/roles.decorator';
import { USerType } from 'src/user/enum/user-type.emu';
import { UserId } from 'src/decorators/user-id-decorator';

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
