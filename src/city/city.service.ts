import { Injectable, NotFoundException } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CityService {

  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  async getAllCitiesbyStateId(stateId: number): Promise<CityEntity[]> {

    const cities = await this.cityRepository.find({
      where: {
        stateId
      }
    });

    if(cities.length === 0) {
      throw new NotFoundException(`Não existem cidades para o estado com o id ${stateId}`); 
    }

    return cities;
  }
}
