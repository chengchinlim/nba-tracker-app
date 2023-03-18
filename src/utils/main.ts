import path from 'path'
import fs from 'fs'

export const writeDataToLocalStorage = async (params: {
  externalFilePath: string
  response: unknown
}): Promise<{
  filePath: string
  externalFilePath: string
}> => {
  const localDirectory = path.join(process.cwd(), '/tmp')
  /*
    * Not including a slash at the beginning of the file path
    * to prevent AWS to create a root directory
    * */
  // const externalFilePath = `seasons/${params.season}/teams/${params.team}.json`
  const { externalFilePath } = params
  const filePath = path.join(localDirectory, '/', externalFilePath)
  const fileDirectory = path.dirname(filePath)
  if (!fs.existsSync(filePath)) {
    console.log(`Creating directory ${fileDirectory}`)
    fs.mkdirSync(fileDirectory, { recursive: true })
  }
  const writePromise = new Promise<void>((resolve, reject) => {
    fs.open(filePath, 'w', (err) => {
      if (err != null) {
        console.error(err)
        reject(err)
      }
      console.log(`Start writing file locally ${filePath}`)
      const tempFile = fs.createWriteStream(filePath)
      tempFile.on('error', (error) => {
        console.error(error)
        reject(error)
      })
      tempFile.on('finish', () => {
        console.log(`Finished writing file locally ${filePath}`)
        resolve()
      })
      tempFile.write(JSON.stringify(params.response))
      // tempFile.write(JSON.stringify({ message: '1' }))
      tempFile.end()
    })
  })
  await writePromise
  return {
    externalFilePath,
    filePath
  }
}
