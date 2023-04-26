import { configs } from '../config'
import IORedis from 'ioredis'

export const redis = new IORedis(configs.redis.url, {
  maxRetriesPerRequest: null
})
