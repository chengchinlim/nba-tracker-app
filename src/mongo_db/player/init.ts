import fs from 'fs'
import { chain } from 'stream-chain'
import * as zlib from 'zlib'
import { parser } from 'stream-json'
import { ignore } from 'stream-json/filters/Ignore'
import { streamValues } from 'stream-json/streamers/StreamValues'
import { pick } from 'stream-json/filters/Pick'
/* Only use locally
*
* */
const readDataFromLocalStorage = (): void => {
  const filePath = `${process.cwd()}/data/external/players.json`
  console.log(`Reading data from ${filePath}`)
  const pipeline = chain([
    fs.createReadStream(filePath),
    // zlib.createGunzip(),
    parser(),
    pick({ filter: 'league.standard' }),
    // ignore({ filter: /\b_meta\b/i }),
    streamValues(),
    data => data
  ])
  pipeline.on('data', (data: unknown) => { console.log(data) })
  pipeline.on('end', () => { console.log('end') })
}

readDataFromLocalStorage()
