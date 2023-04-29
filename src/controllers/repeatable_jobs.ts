import { type Request, type Response, Router } from 'express'
import { createRepeatableJobs, getRepeatableJobs, removeRepeatableJobs } from '../repeatable_jobs/init'

const repeatableJobsRouter = Router()

repeatableJobsRouter.post('/', (req: Request, res: Response) => {
  void (async () => {
    try {
      const results = await createRepeatableJobs()
      // const season = parseInt(req.query.season as string)
      // const team = parseInt(req.query.team as string)
      // const statsPerGames = await getPlayerStatsData({ season, team })
      // console.log(statsPerGames)
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
      res.status(200).send(results)
    } catch (err) {
      res.status(500).send(err)
    }
  })()
})

repeatableJobsRouter.get('/', (req: Request, res: Response) => {
  void (async () => {
    const jobs = await getRepeatableJobs()
    res.status(200).send(jobs)
  })()
})

repeatableJobsRouter.delete('/', (req: Request, res: Response) => {
  void (async () => {
    const results = await removeRepeatableJobs()
    res.status(200).send(results)
  })()
})

export default repeatableJobsRouter
