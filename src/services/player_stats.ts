import { type PlayerStatsPerGame } from '../third_party/types/player_stats_per_game'
import { savePlayer, searchPlayerByPlayerId } from '../mongo_db/player/service'
import { getPlayerStatsData } from '../third_party/main'
import { getSeason } from './main'
import { getTeam } from '../mongo_db/team/service'

const filterOutRepeatedPlayerStats = (
  playerStats: PlayerStatsPerGame[], latestGameId?: number
): Map<number, PlayerStatsPerGame[]> => {
  /*
  * If gameId is smaller
  * means that it's previously saved in the database
  * */
  if (latestGameId !== undefined) {
    playerStats = playerStats.filter(
      stats => stats.game.id > latestGameId
    )
  }
  const playerIdToStatsMap = new Map<number, PlayerStatsPerGame[]>()
  for (const stat of playerStats) {
    const playerId = stat.player.id
    let playerStats = playerIdToStatsMap.get(playerId)
    if (playerStats !== undefined) {
      playerStats.push(stat)
    } else {
      playerStats = [stat]
    }
    playerIdToStatsMap.set(playerId, playerStats)
  }
  return playerIdToStatsMap
}

// const addPlayerIfNotExist = async (player: TPlayer): Promise<boolean> => {
//   const searched = await searchPlayerByPlayerId(player.playerId)
//   if (searched !== null) {
//     return false
//   }
//   await savePlayer(player)
//   console.log(`Player ${player.firstName} ${player.lastName} saved to database`)
//   return true
// }

export const updateStats = async (teamId: number): Promise<boolean> => {
  const correctTeam = await getTeam(teamId)
  if (correctTeam === null) {
    return false
  }
  const stats = await getPlayerStatsData({
    season: getSeason(),
    team: correctTeam.teamId
  })
  const playerIdToStatsMap = filterOutRepeatedPlayerStats(
    stats,
    correctTeam.latestGameId
  )
  // for (const [playerId, stats] of playerIdToStatsMap) {
  //
  // }
  return true
}
