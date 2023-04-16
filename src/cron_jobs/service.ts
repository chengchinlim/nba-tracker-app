import { Team } from '../mongo_db/team/model'
import { connectMongoDb } from '../mongo_db/main'
import dayjs from 'dayjs'
connectMongoDb()

const getTeamId = async (): Promise<number | undefined> => {
  const teamsNotUpdated = await Team.find()
    .sort({ lastUpdated: 1, teamId: 1 })
    .limit(1)
  const [team] = teamsNotUpdated
  if (team.lastUpdated === null) {
    // always run cron job if lastUpdated is null
    return team.teamId
  }
  const lastUpdatedTimestamp = dayjs(team.lastUpdated)
  const diffInHours = lastUpdatedTimestamp.diff(dayjs(), 'hours')
  return diffInHours >= 24
    ? team.teamId
    /*
    * Don't return teamId
    * if within 24 hours
    * because we don't want cron job to run
    * */
    : undefined
}

const getSeason = (): number => {
  const now = dayjs()
  const currentYear = now.year()
  const followingYear = now.add(1, 'year').year()
  /*
  * NBA playoffs end in June
  * so after June it counts as following year
  * */
  return now.month() + 1 > 6 ? currentYear : followingYear
}
