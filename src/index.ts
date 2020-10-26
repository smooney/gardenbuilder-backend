import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server'
import { createSchema } from './libs/createSchema'

async function main() {
  const connection = await createConnection()
  const schema = await createSchema()
  const server = new ApolloServer({ schema })
  await server.listen(8000)
  console.log('Server has started!')
}
main()
