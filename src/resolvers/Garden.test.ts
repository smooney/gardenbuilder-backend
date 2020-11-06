import { Connection, getConnection } from 'typeorm'
import { callGraphQL } from '../test-utils/callGraphQL'
import { testConnection } from '../test-utils/createTestConnection'
import faker from 'faker'
import { User } from '../entities/User'
import { Garden } from '../entities/Garden'
import jwt from '../libs/jwt'

let connection: Connection
beforeAll(async () => {
  connection = await testConnection()
})
afterAll(async () => {
  await connection.close()
})

const createGardenMutation = `
mutation CreateGarden($name: String!) {
    createGarden(name: $name) {
      garden {
        name
      }
      error {
        message
      }
    }
  }
  `

type CreateGardenArguments = {
  name: string
}

describe('createGarden', () => {
  let gardenArguments: CreateGardenArguments
  let ownerId: number
  beforeAll(async () => {
    gardenArguments = await makeCreateGardenArguments()

    const user = await User.find({ take: 1 })
    ownerId = user[0].id

    async function makeCreateGardenArguments(): Promise<CreateGardenArguments> {
      return {
        name: faker.commerce.productName(),
      }
    }
  })
  afterAll(async () => {
    removeGardenFromTestDatabase()

    function removeGardenFromTestDatabase() {
      connection
        .createQueryBuilder()
        .delete()
        .from(Garden)
        .where('ownerId = :ownerId', { ownerId })
        .execute()
    }
  })

  it('returns its name after creation', async () => {
    const token = jwt.assign(ownerId.toString())
    const response = await callGraphQL({
      source: createGardenMutation,
      variableValues: gardenArguments,
      authorizationHeader: token,
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
