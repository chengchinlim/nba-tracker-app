import dayjs from 'dayjs'

export const getSeason = (): number => {
  const now = dayjs()
  const currentYear = now.year()
  const followingYear = now.add(1, 'year').year()
  /*
  * NBA playoffs end in June
  * so after June it counts as following year
  * */
  return now.month() + 1 > 6 ? followingYear : currentYear
}
