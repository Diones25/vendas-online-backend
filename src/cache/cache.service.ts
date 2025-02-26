import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: any
  ) { }

  async getCache<T>(key: string, functionQuest: () => Promise<T>): Promise<T> {
    const allData: T = await this.cacheManager.get(key);

    if (allData) {
      return allData;
    }

    const cache: T = await functionQuest();

    await this.cacheManager.set(key, cache);

    return cache;
  }
}
