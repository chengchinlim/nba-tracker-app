import { configs } from './config'
import express, { type Request, type Response } from 'express'
import cors from 'cors'
import { connectMongoDb } from './mongo_db/main'
import { Player } from './mongo_db/player'
import { getPlayerStatsData } from './third_party/main'
import { writeDataToLocalStorage } from './utils/main'
import { writeToS3Bucket } from './aws/main'

connectMongoDb()

const app = express()
app.use(
  express.json(),
  express.urlencoded({ extended: true }),
  cors({ origin: true })
)

app.get('/health', (req: Request, res: Response) => {
  res.status(200).send('Express + TypeScript Server')
})

app.post('/player', async (req: Request, res: Response) => {
  const player = new Player({
    firstName: 'Cheng',
    lastName: 'Lim',
    rapidApiId: 1,
    teamId: 1
  })
  const created = await player.save()
  res.status(200).send(created)
})

app.get('/player', async (req: Request, res: Response) => {
  const players = await Player.findOne({
    teamId: 1
  })
  res.status(200).send(players)
})

// app.get('/stats', async (req: Request, res: Response) => {
//   try {
//
//     res.status(200).send('Got the data')
//   } catch (err) {
//     res.status(500).send(err)
//   }
// })

app.post('/stats', async (req: Request, res: Response) => {
  try {
    const season = parseInt(req.query.season as string)
    const team = parseInt(req.query.team as string)
    const statsPerGames = await getPlayerStatsData({ season, team })
    /*
    * Learned to write data to local utils
    * and write it to S3 bucket
    * but it's not necessary for now since the data size is small
    * */
    const filePaths = await writeDataToLocalStorage({
      externalFilePath: `seasons/${season}/teams/${team}.json`,
      response: statsPerGames
    })
    await writeToS3Bucket(filePaths)
    res.status(200).send('Done')
  } catch (err) {
    res.status(500).send(err)
  }
})

app.listen(configs.port, () => {
  console.log(`⚡️Server is running at port ${configs.port}`)
})
