import { type Job, Queue, Worker } from 'bullmq'
import { redis } from './redis'

interface UpdateStatsJobData {
  teamId: number
  cronSchedule: string
}

export class CronJobQueue {
  private readonly worker: Worker
  private readonly queue: Queue
  constructor (queueName: string) {
    this.worker = new Worker(
      queueName, async (job: Job<UpdateStatsJobData>) => {
        console.log(`Updating stats for ${job.data.teamId}`)
      }, {
        connection: redis,
        autorun: true
      })
    this.worker.on('completed', (job: Job<UpdateStatsJobData>) => {
      console.log(`Completed team ${job.data.teamId}`)
    })
    this.worker.on('error', err => {
      console.error('onError ', err)
    })
    this.queue = new Queue(queueName, {
      connection: redis,
      defaultJobOptions: {
        attempts: 3,
        removeOnComplete: true,
        removeOnFail: true
      }
    })
  }

  listJobs = async (): Promise<string[]> => {
    const jobs = await this.queue.getRepeatableJobs()
    return jobs.map(job => {
      return job.name
    })
  }

  addJob = async (data: UpdateStatsJobData): Promise<string | undefined> => {
    const job = await this.queue.add(`update_stats_team_${data.teamId}`, data, {
      repeat: {
        pattern: data.cronSchedule
      }
    })
    return job.id
  }

  removeJob = async (params: {
    jobName: string
    cronSchedule: string
  }): Promise<boolean> => {
    const { jobName, cronSchedule } = params
    return await this.queue.removeRepeatable(jobName, {
      pattern: cronSchedule
    })
  }
}
