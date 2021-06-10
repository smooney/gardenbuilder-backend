import { ExecutionResult } from 'graphql'
import typeorm from 'typeorm'
import { callGraphQL, testConnection } from '../testUtils'

let connection: typeorm.Connection
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

describe('the basicTypes query', () => {
  it('returns an array', async () => {
    response = await callGraphQL({ source: basicTypesQuery })
    expect(Array.isArray(response?.data?.basicTypes)).toBeTruthy()
  })
})
