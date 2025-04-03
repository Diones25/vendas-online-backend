import { Test } from "@nestjs/testing";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CityEntityMock } from "./mocks/city.mock";
import { CityService } from "./city.service";
import { CityEntity } from "./entities/city.entity";
import { CacheService } from "../cache/cache.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe('CityService', () => {
  let service: CityService;
  let cityRepository: Repository<CityEntity>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CityService,
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockResolvedValue([CityEntityMock])
          },
        },
        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            find: jest.fn().mockReturnValue([CityEntityMock]),
            findOne: jest.fn().mockReturnValue(CityEntityMock),
          }
        }
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<CityEntity>>(getRepositoryToken(CityEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  });


  it('should return object of city', async () => {
    const city = await service.findCityById(CityEntityMock.id);
    expect(city).toEqual(CityEntityMock);
  });

  it('should throw BadRequestException when cityId is greater than city.id', async () => {
    const mockCity = { ...CityEntityMock, id: 1 };
    jest.spyOn(cityRepository, 'findOne').mockResolvedValueOnce(mockCity);

    await expect(service.findCityById(2)).rejects.toThrow(BadRequestException);
    await expect(service.findCityById(2)).rejects.toThrow(
      `O cityId 2 é maior que o id da cidade 1`
    );
  });

  it('should throw NotFoundException when city is not found', async () => {
    jest.spyOn(cityRepository, 'findOne').mockResolvedValue(null);
    const cityId = 1;
    expect(service.findCityById(cityId)).rejects.toThrowError(
      new NotFoundException(`Cidade com o id ${cityId} não encontrada`)
    );
  });

  it('should return cities when cities exist for the state', async () => {
    const stateId = 1;
    const cities = [CityEntityMock];
    const result = await service.getAllCitiesbyStateId(stateId);
    expect(result).toEqual(cities);
  });

  it('should return cities from cache if available', async () => {
    const stateId = 1;
    const cities = [CityEntityMock];
    jest.spyOn(service['cacheService'], 'getCache').mockResolvedValueOnce(cities);

    const result = await service.getAllCitiesbyStateId(stateId);
    expect(result).toEqual(cities);
    expect(service['cacheService'].getCache).toHaveBeenCalledWith(
      `state_${stateId}`,
      expect.any(Function)
    );
  });

  it('should fetch cities from repository if not in cache', async () => {
    const stateId = 1;
    const cities = [CityEntityMock];
    jest.spyOn(service['cacheService'], 'getCache').mockImplementationOnce(async (key, fetchFn) => {
      return fetchFn();
    });
    jest.spyOn(cityRepository, 'find').mockResolvedValueOnce(cities);

    const result = await service.getAllCitiesbyStateId(stateId);
    expect(result).toEqual(cities);
    expect(cityRepository.find).toHaveBeenCalledWith({ where: { stateId } });
  });

});
