import { Team } from './model'
import { type ITeam } from './type'

export const getTeam = async (teamId: number): Promise<ITeam | null> => {
  const team = await Team.findOne({
    teamId
  })
  if (team !== null) {
    console.log(`Team ${team.code} found`)
  }
  return team
}
