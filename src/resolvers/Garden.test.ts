import { Connection, getConnection } from 'typeorm'
import { callGraphQL } from '../test-utils/callGraphQL'
import { testConnection } from '../test-utils/createTestConnection'
import faker from 'faker'
import { User } from '../entities/User'
import { Garden } from '../entities/Garden'

let connection: Connection
beforeAll(async () => {
  connection = await testConnection()
})
afterAll(async () => {
  await connection.close()
})

const createGardenMutation = `
mutation CreateGarden($name: String!, $ownerId: Int!) {
    createGarden(name: $name, ownerId: $ownerId) {
      garden {
        name
        ownerId
      }
      error {
        message
      }
    }
  }
  `

describe('createGarden', () => {
  type GardenArguments = {
    ownerId: number
    name: string
  }

  let gardenArguments: GardenArguments
  beforeAll(async () => {
    gardenArguments = {
      name: faker.commerce.productName(),
      ownerId: (await User.find({ take: 1 }))[0].id,
    }
  })
  afterAll(async () => {
    // remove garden from test db
    await connection
      .createQueryBuilder()
      .delete()
      .from(Garden)
      .where('ownerId = :ownerId', { ownerId: gardenArguments.ownerId })
      .execute()
  })

  it('returns its name and ownerId after creation', async () => {
    const response = await callGraphQL({
      source: createGardenMutation,
      variableValues: gardenArguments,
    })
    expect(response).toMatchObject({
      data: {
        createGarden: {
          garden: gardenArguments,
        },
      },
    })
  })
})
