import * as fs from 'fs'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { configs } from '../config'

const s3Client = new S3Client({})

export const writeToS3Bucket = async (detail: {
  filePath: string
  externalFilePath: string
}): Promise<void> => {
  // Read content from the file
  const readPromise = new Promise<string>((resolve, reject) => {
    fs.readFile(detail.filePath, { encoding: 'utf-8' }, function (err, data) {
      if (err != null) {
        console.log(err)
        reject(err)
      }
      resolve(data)
    })
  })
  // const fileDirectory = path.dirname(filePath)
  // const fileName = path.basename(filePath)

  console.log(`Start reading file: ${detail.filePath}`)
  // Setting up S3 upload parameters
  const params = {
    Bucket: configs.aws.s3Bucket,
    Key: detail.externalFilePath, // File name and path you want to save as in S3
    Body: Buffer.from(await readPromise, 'utf-8')
  }
  try {
    console.log(`Start Writing to S3 bucket: ${detail.externalFilePath}`)
    const response = await s3Client.send(new PutObjectCommand(params))
    console.log('Successfully uploaded file to S3, status code: ', response.$metadata.httpStatusCode)
  } catch (err) {
    console.error('Failed to upload', err)
  }
}
