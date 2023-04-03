import { configs } from './config'
import express, { type Request, type Response } from 'express'
import cors from 'cors'
import { connectMongoDb } from './mongo_db/main'
import { Player } from './mongo_db/player/model'
import { getPlayerStatsData } from './third_party/main'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import { searchPlayerByName } from './mongo_db/player/service'

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

app.post('/player', (req: Request, res: Response) => {
  void (async () => {
    const player = new Player({
      firstName: 'Cheng',
      lastName: 'Lim',
      rapidApiId: 1,
      teamId: 1
    })
    const created = await player.save()
    res.status(200).send(created)
  })
})

app.get('/search', (req: Request, res: Response) => {
  void (async () => {
    const name = req.query.name as string
    const players = await searchPlayerByName(name)
    res.status(200).send(players)
  })()
})

// app.get('/stats', async (req: Request, res: Response) => {
//   try {
//
//     res.status(200).send('Got the data')
//   } catch (err) {
//     res.status(500).send(err)
//   }
// })

app.post('/stats', (req: Request, res: Response) => {
  void (async () => {
    try {
      const season = parseInt(req.query.season as string)
      const team = parseInt(req.query.team as string)
      const statsPerGames = await getPlayerStatsData({ season, team })
      console.log(statsPerGames)
      /*
      * Learned to write data to local utils
      * and write it to S3 bucket
      * but it's not necessary for now since the data size is small
      * */
      // const filePaths = await writeDataToLocalStorage({
      //   externalFilePath: `seasons/${season}/teams/${team}.json`,
      //   response: statsPerGames
      // })
      // await writeToS3Bucket(filePaths)
      res.status(200).send('Done')
    } catch (err) {
      res.status(500).send(err)
    }
  })
})

app.get('*', (req: Request, res: Response) => {
  res.status(200).send('Express + TypeScript Server is running')
})

app.listen(configs.port, () => {
  console.log(`⚡️Server is running at port ${configs.port}`)
})
