import { config } from 'dotenv'
config()

export const configs = {
  port: process.env.PORT ?? 8080,
  env: process.env.NODE_ENV ?? 'dev',
  mongoDB: {
    db: process.env.MONGODB_DB as string,
    host: process.env.MONGODB_HOST as string,
    username: process.env.MONGODB_USERNAME as string,
    password: process.env.MONGODB_PASSWORD as string
  },
  redis: {
    url: process.env.REDIS_SERVER_URL as string,
    host: process.env.REDIS_SERVER_HOST as string,
    port: parseInt(process.env.REDIS_SERVER_PORT as string),
    username: process.env.REDIS_SERVER_USERNAME as string,
    password: process.env.REDIS_SERVER_PASSWORD as string
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    region: process.env.AWS_REGION as string,
    s3Bucket: process.env.AWS_S3_BUCKET as string
  },
  rapidApi: {
    nbaDataUrl: process.env.RAPID_API_NBA_DATA_URL as string,
    host: process.env.RAPID_API_HOST as string,
    apiKey: process.env.RAPID_API_KEY as string
  }
}
