import { graphql, GraphQLSchema } from 'graphql'
import { Maybe } from 'type-graphql'
import { createSchema } from '../libs/createSchema'

interface Options {
  source: string
  variableValues?: Maybe<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }>
}

let schema: GraphQLSchema

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function callGraphQL({ source, variableValues }: Options) {
  await getSchemaIfNeeded()
  return graphql({
    schema,
    source,
    variableValues,
  })

  async function getSchemaIfNeeded() {
    if (!schema) {
      schema = await createSchema()
    }
  }
}
