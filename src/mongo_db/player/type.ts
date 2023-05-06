import { type Base } from '../base'

export interface IPlayer extends Base {
  firstName: string
  lastName: string
  personId: number
  playerId: number
  teamId: number
}
