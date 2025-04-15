import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAddressDto } from './dtos/create-address.dto';
import { AddressService } from './address.service';
import { Roles } from '../decorators/roles.decorator';
import { USerType } from '../user/enum/user-type.emu';
import { UserId } from '../decorators/user-id-decorator';
import { AddressEntity } from './entities/address.entity';
import { ResponseAddressDto } from './dtos/response-address.dto';

@Roles(USerType.USER, USerType.ADMIN)
@Controller('address')
export class AddressController {

  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(@UserId() userId: number, @Body() createAddressDto: CreateAddressDto): Promise<AddressEntity> {
    return this.addressService.createAddress(createAddressDto, userId);
  }

  @Get()
  async findAddressByUserId(@UserId() userId: number): Promise<ResponseAddressDto[]> {
    return (await this.addressService.findAddressByUserId(userId)).map(address => new ResponseAddressDto(address));
  }
}
