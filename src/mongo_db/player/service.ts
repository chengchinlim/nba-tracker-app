import { Player } from './model'
import { type IPlayer } from './type'

export const searchPlayerByName = async (name: string): Promise<IPlayer[]> => {
  if (name.length < 2) {
    throw new Error('Player name must be at least 2 characters long')
  }
  const players = await Player
    .find({
      $or: [
        { firstName: new RegExp(name, 'gi') },
        { lastName: new RegExp(name, 'gi') }
      ]
    })
    .lean()
  console.log('searchPlayerByName: ', players.map(player => player._id.toString()))
  return players
}

export const searchPlayerByPlayerId = async (playerId: number): Promise<IPlayer | null> => {
  const player = await Player
    .findOne({ playerId })
    .lean()
  console.log('searchPlayerByPlayerId: ', playerId)
  return player
}

export const savePlayer = async (player: IPlayer): Promise<string> => {
  const newPlayer = new Player(player)
  const savedPlayer = await newPlayer.save()
  return savedPlayer._id.toString()
}
