import swaggerAutogen from 'swagger-autogen'

const outputFile = '../lib/swagger_output.json'
// const endpointsFiles = ['../lib/app.js', '../lib/controllers/*.js']
const endpointsFiles = ['../src/app.ts']

const doc = {
  servers: [
    {
      url: 'http://localhost:8080/',
      description: 'local server'
    },
    {
      url: 'https://api.nbatracker.app',
      description: 'main server'
    }
  ]
}

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc)
  .then(_ => { console.log('Generated swagger file!') })
  .catch(err => { console.log(err) })
