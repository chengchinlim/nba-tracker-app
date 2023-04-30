import { Team } from '../mongo_db/team/model'
import { connectMongoDb } from '../mongo_db/main'
import dayjs from 'dayjs'
connectMongoDb()

export const getTeamId = async (teamId: number): Promise<number | null> => {
  const team = await Team.findOne({
    teamId
  })
  return team !== null ? team.teamId : null
}

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
