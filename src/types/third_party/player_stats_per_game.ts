
export interface PlayerStatsPerGame {
  player: {
    id: number
    firstname: string
    lastname: string
  }
  team: {
    id: number
    name: string
    nickname: string
    code: string
    logo: string
  }
  game: {
    id: number
  }
  points: number
  pos: string
  min: string
  fgm: number
  fga: number
  fgp: string
  ftm: number
  fta: number
  ftp: string
  tpm: number
  tpa: number
  tpp: string
  offReb: number
  defReb: number
  totReb: number
  assists: number
  pFouls: number
  steals: number
  turnovers: number
  blocks: number
  plusMinus: string
  comment: null
}
