import { ExecutionResult } from 'graphql'
import { Connection } from 'typeorm'
import {
  callGraphQL,
  testConnection,
} from '../testUtils'

let connection: Connection
let response: ExecutionResult<{ [key: string]: any; }>

beforeAll(async () => {
  connection = await testConnection()
  response = await callGraphQL({
    source: basicTypesQuery,
    // variableValues: { id: bed.id },
  })
})

afterAll(async () => {
  connection.close()
})

const basicTypesQuery = `
query BasicTypes {
  basicTypes 
}
`

it('returns an array', async () => {
  expect(Array.isArray(response?.data?.basicTypes)).toBeTruthy()
})

