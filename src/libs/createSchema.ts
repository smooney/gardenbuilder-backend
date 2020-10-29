import { buildSchema } from 'type-graphql'
import { GraphQLSchema } from 'graphql'
import { UserResolver } from '../resolvers/User'
import { GardenResolver } from '../resolvers/Garden'
import { HelloWorld } from '../resolvers/HelloWorld'

export async function createSchema(): Promise<GraphQLSchema> {
  return await buildSchema({
    resolvers: [GardenResolver, HelloWorld, UserResolver],
  })
}
