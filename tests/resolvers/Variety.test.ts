import { ExecutionResult } from 'graphql'
import { Connection } from 'typeorm'
import { callGraphQL, testConnection } from '../testUtils'

let connection: Connection
let response: ExecutionResult<{ [key: string]: any }>

beforeAll(async () => {
  connection = await testConnection()
})

afterAll(async () => {
  connection.close()
})

const basicTypesQuery = `
query BasicTypes {
  basicTypes 
}
`

describe('the basicTypes query', async () => {
  it('returns an array', async () => {
    response = await callGraphQL({ source: basicTypesQuery })
    expect(Array.isArray(response?.data?.basicTypes)).toBeTruthy()
  })
})
