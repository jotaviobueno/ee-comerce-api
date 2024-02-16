import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { environment } from 'src/config';

@Injectable()
export class CacheService extends Redis {
  constructor() {
    super({
      host: '127.0.0.1',
      password: environment.REDIS_PASSWORD,
    });

    super.on('error', (err) => {
      console.log(err);
      process.exit(1);
    });
  }

  async getCache<T>(name: string): Promise<T | null> {
    const cache = await this.get(name);

    return JSON.parse(cache);
  }

  async setCache(name: string, values: unknown, seconds: number = 30) {
    return this.set(name, JSON.stringify(values), 'EX', seconds);
  }
}
