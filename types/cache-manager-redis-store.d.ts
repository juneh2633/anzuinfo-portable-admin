declare module 'cache-manager-redis-store' {
  import { CacheStoreFactory } from 'cache-manager';

  const redisStore: CacheStoreFactory;
  export = redisStore;
}
