import { Connection } from 'typeorm'
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
const gardensQuery = `
query Gardens {
    gardens {
      gardens {
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

describe('the createGarden mutation', () => {
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
  // afterAll(async () => {
  //   removeGardenFromTestDatabase()

  //   function removeGardenFromTestDatabase() {
  //     connection
  //       .createQueryBuilder()
  //       .delete()
  //       .from(Garden)
  //       .where('ownerId = :ownerId', { ownerId })
  //       .execute()
  //   }
  // })

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

describe('the gardens query', () => {
  // let gardenArguments: CreateGardenArguments
  let ownerId: number
  beforeAll(async () => {
    ownerId = await getOwnerIdFromDatabase()
    await createGardenInDatabaseForOwner(ownerId)

    async function getOwnerIdFromDatabase(): Promise<number> {
      const user = await User.find({ take: 1 })
      return user[0].id
    }

    async function createGardenInDatabaseForOwner(ownerId: number) {
      const garden = Garden.create({
        name: 'A Cool Garden',
        ownerId,
      })
      await garden.save()
    }
  })

  it('returns a list of gardens', async () => {
    const token = jwt.assign(ownerId.toString())
    const response = await callGraphQL({
      source: gardensQuery,
      authorizationHeader: token,
    })
    expect(response?.data?.gardens.gardens.includes({ name: 'A Cool Garden' }))
  })
})
