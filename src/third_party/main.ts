import axios from 'axios'
import { type PlayerStatsPerGame } from '../types/third_party/player_stats_per_game'
import { configs } from '../config'

export const getPlayerStatsData = async (params: {
  season: number
  team: number
}): Promise<PlayerStatsPerGame[]> => {
  const response = await axios.get(`${configs.rapidApi.nbaDataUrl}/players/statistics`, {
    responseType: 'json',
    headers: {
      'X-RapidAPI-Host': configs.rapidApi.host,
      'X-RapidAPI-Key': configs.rapidApi.apiKey
    },
    params
  })
  return response.data.response as PlayerStatsPerGame[]
}
