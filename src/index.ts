import 'reflect-metadata'
import { config } from 'dotenv'
import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server'
import { createSchema } from './utils/createSchema'
import { RequestWithAuthenticationHeader } from './types/RequestWithAuthenticationHeader'

config()

const PORT = process.env.PORT || 8080

async function setupAndRunServer() {
  try {
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
    console.log(`Server has started on port ${PORT}`) // eslint-disable-line no-console
  } catch (err) {
    console.log(err) // eslint-disable-line no-console
  }
}

setupAndRunServer()
