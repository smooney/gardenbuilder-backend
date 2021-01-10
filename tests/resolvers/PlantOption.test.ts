import { Connection } from 'typeorm'
import { callGraphQL, testConnection } from '../testUtils'

let connection: Connection

beforeAll(async () => {
  connection = await testConnection()
})

afterAll(async () => {
  connection.close()
})

const plantOptionsQuery = `
query {
    plantOptions {
      plantOptions {
        commonName
        id
      }
      errors {
        message
      }
    }
  }
  `

describe.skip('the PlantOptions query', () => {
  it('returns some plant options', async () => {
    const response = await callGraphQL({
      source: plantOptionsQuery,
      variableValues: {},
    })

    const plantOptions = response?.data?.plantOptions.plantOptions

    expect(plantOptions.length).toBeGreaterThan(0)
  })
})
