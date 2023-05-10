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

export const updateTeamLatestGameId = async (params: {
  teamId: number
  latestGameId: number
}): Promise<boolean> => {
  const { teamId, latestGameId } = params
  const team = await Team.findOne({
    teamId
  })
  if (team === null) {
    console.log(`Team ${teamId} not found`)
    return false
  }
  team.latestGameId = latestGameId
  await team.save()
  console.log(`Team ${teamId} updated latestGameId to ${latestGameId}`)
  return true
}
