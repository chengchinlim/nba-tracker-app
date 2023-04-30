import { Player } from './model'
import { type TPlayer } from './type'

export const searchPlayerByName = async (name: string): Promise<TPlayer[]> => {
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

export const searchPlayerByPlayerId = async (playerId: number): Promise<TPlayer | null> => {
  const player = await Player
    .findOne({ playerId })
    .lean()
  console.log('searchPlayerByPlayerId: ', playerId)
  return player
}

export const savePlayer = async (player: TPlayer): Promise<TPlayer> => {
  const newPlayer = new Player(player)
  return await newPlayer.save()
}
