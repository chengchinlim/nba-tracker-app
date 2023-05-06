import { type Base } from '../base'

export interface ITeam extends Base {
  teamId: number
  code: string
  latestGameId?: number
}
