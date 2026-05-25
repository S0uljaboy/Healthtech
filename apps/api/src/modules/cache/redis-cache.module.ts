import { Module, Global } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => {
        // Fallback to memory if Redis URL is not set (e.g. local dev without docker)
        if (!process.env.REDIS_URL) {
          return { ttl: 60 };
        }
        
        return {
          store: await redisStore({
            url: process.env.REDIS_URL,
            ttl: 60, // 60 seconds default
          }),
        };
      },
    }),
  ],
  exports: [CacheModule],
})
export class RedisCacheModule {}
