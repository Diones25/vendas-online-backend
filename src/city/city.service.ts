import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class CityService {

  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    private readonly cacheService: CacheService
    
  ) {}

  async getAllCitiesbyStateId(stateId: number): Promise<CityEntity[]> {
    return this.cacheService.getCache<CityEntity[]>(`state_${stateId}`, async () => {
      
      const cities = await this.cityRepository.find({
        where: {
          stateId
        }
      });

      if (cities.length === 0) {
        throw new NotFoundException(`Não existem cidades para o estado com o id ${stateId}`);
      }

      return cities;
    }); 
  }
}
