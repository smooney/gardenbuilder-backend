import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server'
import { createSchema } from './utils/createSchema'
import { RequestWithAuthenticationHeader } from './types/RequestWithAuthenticationHeader'

const PORT = 8000

async function setupAndRunServer() {
  await createConnection()
  const schema = await createSchema()
  const devMode = process.env.NODE_ENV === 'development'
  const server = new ApolloServer({
    cors: devMode,
    schema,
    context: ({ req }: { req: RequestWithAuthenticationHeader }) => {
      return { req }
    },
  })

  await server.listen(PORT)
  console.log(`Server has started on port ${PORT}`)
}

setupAndRunServer()
