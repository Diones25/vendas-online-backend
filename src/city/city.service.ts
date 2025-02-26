import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CityService {

  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: any
  ) {}

  async getAllCitiesbyStateId(stateId: number): Promise<CityEntity[]> {
    const citiesCached: CityEntity[] = await this.cacheManager.get(`state_${stateId}`);

    if (citiesCached) {
      return citiesCached;
    }

    const cities = await this.cityRepository.find({
      where: {
        stateId
      }
    });

    if(cities.length === 0) {
      throw new NotFoundException(`Não existem cidades para o estado com o id ${stateId}`); 
    }


    await this.cacheManager.set(`state_${stateId}`, cities);

    return cities;
  }
}
