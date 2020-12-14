import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server'
import { createSchema } from './utils/createSchema'
import { RequestWithAuthenticationHeader } from './types/RequestWithAuthenticationHeader'

const PORT = 8000

async function setupAndRunServer() {
  await createConnection()
  const schema = await createSchema()
  const server = new ApolloServer({
    cors: process.env.NODE_ENV === 'development',
    schema,
    context: ({ req }: { req: RequestWithAuthenticationHeader }) => {
      return { req }
    },
    playground: true, // must be set to see playground in production
    introspection: true, // must be set for playground to connect to server in production
  })

  await server.listen(PORT)
  console.log(`Server has started on port ${PORT}`)
}

setupAndRunServer()
