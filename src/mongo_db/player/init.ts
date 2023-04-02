import fs from 'fs'
import { chain } from 'stream-chain'
import { parser } from 'stream-json'
import { pick } from 'stream-json/filters/Pick'
import { streamArray } from 'stream-json/streamers/StreamArray'
import { Player } from './model'
import { connectMongoDb } from '../main'
connectMongoDb()
interface TPlayer {
  'firstName': string
  'lastName': string
  'personId': string
  'isActive': boolean
}

/* Only use locally
*  Init players data from a JSON file to MongoDB database
* */
(function (): void {
  const filePath = `${process.cwd()}/data/external/players.json`
  console.log(`Reading data from ${filePath}`)
  const pipeline = chain([
    fs.createReadStream(filePath),
    parser(),
    pick({ filter: 'league.standard' }),
    streamArray()
  ])
  pipeline.on('data', (data: { value: TPlayer }) => {
    void (async () => {
      pipeline.pause()
      const player = data.value
      if (player.isActive) {
      /*
      * TeamId and playerId will be set
      * using RapidApi data
      * */
        const newPlayer = new Player({
          firstName: player.firstName,
          lastName: player.lastName,
          personId: player.personId,
          isActive: player.isActive,
          teamId: -1,
          playerId: -1
        })
        await newPlayer.save()
        console.log(`Saving new player: ${JSON.stringify(newPlayer)}`)
      }
      pipeline.resume()
    })
  })
  pipeline.on('end', () => { console.log('end') })
}())
