import dayjs from 'dayjs'

export const getSeason = (): number => {
  const now = dayjs()
  const currentYear = now.year()
  const previousYear = now.subtract(1, 'year').year()
  /*
  * 2022-23 season is 2022
  * so after June it counts as current year
  * */
  return now.month() + 1 > 6 ? currentYear : previousYear
}
