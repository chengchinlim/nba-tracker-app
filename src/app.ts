import { configs } from './config'
import express, { type Request, type Response } from 'express'
import cors from 'cors'
import { connectMongoDb } from './mongo_db/main'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import { searchPlayerByName } from './mongo_db/player/service'
import repeatableJobsRouter from './controllers/repeatable_jobs'

connectMongoDb()

const app = express()
app.use(
  express.json(),
  express.urlencoded({ extended: true }),
  cors({ origin: true })
)
app.use('/doc', swaggerUi.serve,
  swaggerUi.setup(JSON.parse(fs.readFileSync(`${process.cwd()}/lib/swagger_output.json`, 'utf-8')))
)
app.use('/repeatable-jobs', repeatableJobsRouter)

app.get('/search', (req: Request, res: Response) => {
  void (async () => {
    const name = req.query.name as string
    const players = await searchPlayerByName(name)
    res.status(200).send(players)
  })()
})

app.get('*', (req: Request, res: Response) => {
  res.status(200).send('Express + TypeScript Server is running')
})

app.listen(configs.port, () => {
  console.log(`⚡️Server is running at port ${configs.port}`)
})
