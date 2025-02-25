import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CityService } from './city.service';
import { CityEntity } from './entities/city.entity';

@Controller('city')
export class CityController {

  constructor(private readonly cityService: CityService) {}

  @Get(':id')
  async getAllCitiesbyStateId(@Param('id', ParseIntPipe) id: number): Promise<CityEntity[]> {
    return this.cityService.getAllCitiesbyStateId(id);
  }
}
