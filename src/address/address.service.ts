import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/create-address.dto';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';

@Injectable()
export class AddressService {

  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) { }
  
  async createAddress(createAddressDto: CreateAddressDto, userId: number) { 
    
    await this.userService.findUserById(userId);
    await this.cityService.findCityById(createAddressDto.cityId);

    return await this.addressRepository.save({
      ...createAddressDto,
      userId,
    });
  }

  async findAddressByUserId(userId: number): Promise<AddressEntity[]> {
    const addresses = await this.addressRepository.find({
      where: {
        userId
      },
      relations: {
        city: {
          state: true
        }
      }
    });

    if (!addresses || addresses.length === 0) {
      throw new NotFoundException('Nenhum endereço encontrado');
    }

    return addresses;
  }
}
