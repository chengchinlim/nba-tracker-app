import { Player } from './model'
import { connectMongoDb } from '../main'
import { getPlayersData } from '../../third_party/main'
import { PlayerData } from '../../third_party/types/player_data'

connectMongoDb()

async function delay (millis: number): Promise<unknown> {
  return await new Promise(resolve => setTimeout(resolve, millis))
}

/*
* Fill in teamId and playerId of all players from init.ts
* */

(function (): void {
  void (async function () {
    let teamId = 0
    while (teamId < 50) {
      console.log(`teamId: ${teamId}`)
      const playersData = await getPlayersData({
        team: teamId,
        season: 2022
      })
      for (const player of playersData) {
        await Player.findOneAndUpdate({
          firstName: player.firstname,
          lastName: player.lastname
        }, {
          teamId,
          playerId: player.id
        })
        console.log(`Updated player ${player.id}`)
      }
      /*
      * We delay the execution of this function to avoid the rate limit
      * */
      await delay(3000)
      teamId++
    }
  })()
}())
