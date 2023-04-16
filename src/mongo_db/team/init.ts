import fs from 'fs'
import { chain } from 'stream-chain'
import { parser } from 'stream-json'
import { pick } from 'stream-json/filters/Pick'
import { streamArray } from 'stream-json/streamers/StreamArray'
import { connectMongoDb } from '../main'
import { Team } from './model'

connectMongoDb()
interface TTeam {
  id: number
  code: string
  nbaFranchise: boolean
}

/* Only use locally
*  Init teams data from a JSON file to MongoDB database
* */
(function (): void {
  const filePath = `${process.cwd()}/data/teams.json`
  console.log(`Reading data from ${filePath}`)
  const pipeline = chain([
    fs.createReadStream(filePath),
    parser(),
    pick({ filter: 'response' }),
    streamArray()
  ])
  pipeline.on('data', (data: { value: TTeam }) => {
    void (async () => {
      const team = data.value
      if (team.nbaFranchise && team.id === 1) {
        pipeline.pause()
        const newTeam = new Team({
          teamId: team.id,
          code: team.code
        })
        await newTeam.save()
        console.log(`Saving new team: ${JSON.stringify(newTeam)}`)
        // await Team.findOneAndUpdate({
        //   code: team.code
        // }, {
        //   lastUpdated: new Date()
        //   // 2023-04-13T23:28:19.903Z
        // })
        pipeline.resume()
      }
    })()
  })
  pipeline.on('end', () => { console.log('end') })
}())
