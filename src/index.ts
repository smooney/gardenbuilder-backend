import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server'
import { createSchema } from './libs/createSchema'

const PORT = 8000

async function setupAndRunServer() {
  const connection = await createConnection()
  const schema = await createSchema()
  const devMode = process.env.NODE_ENV === 'development'
  const server = new ApolloServer({ cors: devMode, schema })
  await server.listen(PORT)
  console.log(`Server has started on port ${PORT}`)
}

setupAndRunServer()
