import { buildSchema } from 'type-graphql'
import { GraphQLSchema } from 'graphql'
import {
  BedResolver,
  GardenResolver,
  HelloWorld,
  UserResolver,
} from '../resolvers'

export async function createSchema(): Promise<GraphQLSchema> {
  return await buildSchema({
    resolvers: [BedResolver, GardenResolver, HelloWorld, UserResolver],
  })
}
