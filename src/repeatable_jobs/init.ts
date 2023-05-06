import { CronJobQueue } from './main'
import { getTeam } from '../mongo_db/team/service'

export interface THourMin {
  min: number
  hour: number
}

/*
* utcStartTime is the time
* at which the first job will start
* */
const getCronSchedule = (index: number, utcStartTime?: THourMin): string => {
  let min = 0
  let hour = 0
  if (utcStartTime !== undefined) {
    min = utcStartTime.min
    hour = utcStartTime.hour
  }
  let tempIndex = index
  while (tempIndex > 0) {
    /*
    * move from 55th min to the next hour
    * because one hour has 60 minutes
    * */
    if (min + 5 >= 60) {
      min = 0
      /*
      * Resets when it reaches 12am
      * */
      if (hour + 1 >= 24) {
        hour = 0
      } else {
        hour++
      }
    } else {
      min += 5
    }
    tempIndex--
  }
  return `0 ${min} ${hour} * * *`
}

const queue = new CronJobQueue(
  'update_stats_queue'
)

export const createRepeatableJobs = async (utcStartTime?: THourMin): Promise<string[]> => {
  // const jobs = await queue.listJobs()
  // console.log(jobs)
  const results: string[] = []
  for (let i = 0; i < 50; i++) {
    const team = await getTeam(i)
    if (team !== null) {
      const cronSchedule = getCronSchedule(i, utcStartTime)
      const jobId = await queue.addJob({
        teamId: team.teamId,
        cronSchedule
      })
      if (jobId !== undefined) {
        results.push(`JobId: ${jobId} , TeamId: ${team.teamId}, cronSchedule: ${cronSchedule}`)
      }
    }
  }
  return results
  // console.log(await queue.removeJob('test_job'))
}

export const getRepeatableJobs = async (): Promise<string[]> => {
  return await queue.listJobs()
}

export const removeRepeatableJobs = async (utcStartTime?: THourMin): Promise<string[]> => {
  const results: string[] = []
  for (let i = 0; i < 50; i++) {
    const team = await getTeam(i)
    if (team !== null) {
      const cronSchedule = getCronSchedule(i, utcStartTime)
      const jobName = `update_stats_team_${team.teamId}`
      const isRemoved = await queue.removeJob({
        jobName,
        cronSchedule
      })
      results.push(`isRemoved: ${isRemoved ? 'true' : 'false'} , JobName: ${jobName}, cronSchedule: ${cronSchedule}`)
    }
  }
  return results
}
