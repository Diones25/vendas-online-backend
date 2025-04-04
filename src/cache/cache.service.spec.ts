import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from './cache.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('CacheService', () => {
  let service: CacheService;
  let cacheManagerMock: any;

  beforeEach(async () => {
    cacheManagerMock = {
      get: jest.fn(),
      set: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          provide: CACHE_MANAGER,
          useValue: cacheManagerMock,
        },
      ],
    }).compile();

    service = module.get<CacheService>(CacheService);
  });

  it('should return cached data if it exists', async () => {
    const key = 'testKey';
    const cachedData = { data: 'cachedData' };
    cacheManagerMock.get.mockResolvedValue(cachedData);

    const result = await service.getCache(key, jest.fn());

    expect(cacheManagerMock.get).toHaveBeenCalledWith(key);
    expect(result).toEqual(cachedData);
  });

  it('should call functionQuest and cache the result if no cached data exists', async () => {
    const key = 'testKey';
    const newData = { data: 'newData' };
    const functionQuest = jest.fn().mockResolvedValue(newData);
    cacheManagerMock.get.mockResolvedValue(null);

    const result = await service.getCache(key, functionQuest);

    expect(cacheManagerMock.get).toHaveBeenCalledWith(key);
    expect(functionQuest).toHaveBeenCalled();
    expect(cacheManagerMock.set).toHaveBeenCalledWith(key, newData);
    expect(result).toEqual(newData);
  });
});