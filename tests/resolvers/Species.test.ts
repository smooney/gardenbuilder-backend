import { Connection } from 'typeorm'
import { callGraphQL, testConnection } from '../testUtils'

let connection: Connection

beforeAll(async () => {
  connection = await testConnection()
})

afterAll(async () => {
  connection.close()
})

const speciesQuery = `
query {
    species {
      species {
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
      source: speciesQuery,
      variableValues: {},
    })

    const speciesResults = response?.data?.species.species

    expect(speciesResults.length).toBeGreaterThan(0)
  })
})
