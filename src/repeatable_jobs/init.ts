import { CronJobQueue } from './main'
import { getTeamId } from '../services/main'

const getCronSchedule = (index: number): string => {
  let min = 0
  let hour = 0
  let tempIndex = index
  while (tempIndex > 0) {
    /*
    * move from 55th min to the next hour
    * because one hour has 60 minutes
    * */
    if (min + 5 >= 60) {
      hour++
      min = 0
    } else {
      min += 5
    }
    tempIndex--
  }
  return `${min} ${hour} * * * *`
}

const queue = new CronJobQueue(
  'update_stats_queue'
)

export const createRepeatableJobs = async (): Promise<string[]> => {
  // const jobs = await queue.listJobs()
  // console.log(jobs)
  const results: string[] = []
  for (let i = 0; i < 50; i++) {
    const teamId = await getTeamId(i)
    if (teamId !== null) {
      const cronSchedule = getCronSchedule(i)
      const jobId = await queue.addJob({
        teamId,
        cronSchedule
      })
      if (jobId !== undefined) {
        results.push(`JobId: ${jobId} , TeamId: ${teamId}, cronSchedule: ${cronSchedule}`)
      }
    }
  }
  return results
  // console.log(await queue.removeJob('test_job'))
}

export const getRepeatableJobs = async (): Promise<string[]> => {
  return await queue.listJobs()
}

export const removeRepeatableJobs = async (): Promise<string[]> => {
  const results: string[] = []
  for (let i = 0; i < 50; i++) {
    const teamId = await getTeamId(i)
    if (teamId !== null) {
      const cronSchedule = getCronSchedule(i)
      const isRemoved = await queue.removeJob({
        jobName: `update_stats_team_${teamId}`,
        cronSchedule
      })
      results.push(`isRemoved: ${isRemoved ? 'true' : 'false'} , TeamId: ${teamId}, cronSchedule: ${cronSchedule}`)
    }
  }
  return results
}
