'use strict'

const fs = require('fs')

const dotEnvExists = fs.existsSync('.env')
if (dotEnvExists) {
    console.log('getEnv.js: .env files exists, you may be running in the dev environment')
    process.exit()
}

const gcs = require('@google-cloud/storage')()

const bucketName = `envvars.gardenbuilder-backend.gardenbuilder.cloud`
console.log(`Downloading .env from bucket ${bucketName}`)
gcs
    .bucket(bucketname)
    .file('.env')
    .download({ destination: '.env' })
    .then(() => console.log('getEnv.js: .env downloaded successfully'))
    .catch(err => console.error(`getEnv.js: There was an error downloading file: ${JSON.stringify(err)}`))