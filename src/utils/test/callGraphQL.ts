import { graphql, GraphQLSchema } from 'graphql'
import { Maybe } from 'type-graphql'
import { createSchema } from '../createSchema'
import { RequestWithAuthenticationHeader } from '../../types/RequestWithAuthenticationHeader'

interface Options {
  source: string
  variableValues?: Maybe<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }>
  authorizationHeader?: string
}

let schema: GraphQLSchema

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function callGraphQL({
  source,
  variableValues,
  authorizationHeader,
}: Options) {
  await getSchemaIfNeeded()

  return graphql({
    schema,
    source,
    variableValues,
    contextValue: createContextWithAuthorizationHeader(authorizationHeader),
  })

  async function getSchemaIfNeeded() {
    if (!schema) {
      schema = await createSchema()
    }
  }

  function createContextWithAuthorizationHeader(
    authorizationHeader: string | undefined
  ) {
    const req: RequestWithAuthenticationHeader = {
      document: {
        kind: 'Document',
        definitions: [],
      },
      variables: {},
      headers: {
        authorization: authorizationHeader,
      },
    }
    return { req }
  }
}
