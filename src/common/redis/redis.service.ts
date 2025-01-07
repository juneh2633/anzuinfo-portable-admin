import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}
  async get(key: string): Promise<any> {
    return await this.cache.get(key);
  }

  async set(key: string, value: any, option?: any) {
    await this.cache.set(key, value, option);
  }

  // async reset() {
  //   await this.cache.reset();
  // }

  async del(key: string) {
    await this.cache.del(key);
  }
}
