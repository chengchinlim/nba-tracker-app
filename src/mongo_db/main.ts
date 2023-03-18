import mongoose from 'mongoose'
import { configs } from '../config'

export const connectMongoDb = (): void => {
  const mongoDbUrl = `mongodb+srv://${configs.mongoDB.username}` +
      `:${configs.mongoDB.password}` +
      `@${configs.mongoDB.host}` +
      `/${configs.mongoDB.db}`
  mongoose.connect(mongoDbUrl).then().catch(e => {
    console.error(e)
  })
  mongoose.connection
    .once('open', () => {
      console.log('MongoDB is running')
    })
    .on('error', (e) => {
      console.warn(e)
    })
}
