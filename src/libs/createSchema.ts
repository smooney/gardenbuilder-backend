import { buildSchema } from 'type-graphql'
import { GraphQLSchema } from 'graphql'

export async function createSchema(): Promise<GraphQLSchema> {
  return await buildSchema({
    resolvers: [__dirname + '/../resolvers/*.ts'],
    authChecker: ({ context: { req } }, roles) => {
      if (req.session.userId) {
        return true
      }
      return false
    },
  })
}
