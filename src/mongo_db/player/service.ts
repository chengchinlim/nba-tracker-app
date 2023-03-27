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
  console.log(players.map(player => player._id.toString()))
  return players
}
