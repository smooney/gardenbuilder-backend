import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server'
import { createSchema } from './libs/createSchema'
import { RequestWithAuthenticationHeader } from './types/RequestWithAuthenticationHeader'
import { getUserIdFromRequest } from './libs/getUserIdFromRequest'

const PORT = 8000

async function setupAndRunServer() {
  const connection = await createConnection()
  const schema = await createSchema()
  const devMode = process.env.NODE_ENV === 'development'
  const server = new ApolloServer({
    cors: devMode,
    schema,
    context: ({ req }: { req: RequestWithAuthenticationHeader }) => ({
      req,
      userId: getUserIdFromRequest(req),
    }),
  })

  await server.listen(PORT)
  console.log(`Server has started on port ${PORT}`)
}

setupAndRunServer()
