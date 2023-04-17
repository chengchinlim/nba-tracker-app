import dayjs from 'dayjs'

export const testCronJob = (): void => {
  console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))
}
