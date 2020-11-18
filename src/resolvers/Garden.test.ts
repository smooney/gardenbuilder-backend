import { Connection } from 'typeorm'
import { callGraphQL, testConnection } from '../utils/test'
import faker from 'faker'
import { User } from '../entities/User'
import { Garden } from '../entities/Garden'
import jwt from '../utils/jwt'

let connection: Connection
let garden: Garden
let token: string
let owner: User

beforeAll(async () => {
  connection = await testConnection()
  owner = await createUserInDatabase()
  garden = await createGardenInDatabase(owner, 'Default Garden')
  token = jwt.assign(owner.id.toString())
})

afterAll(async () => {
  connection.close()
})

const gardenQuery = `
query Garden($id: Int!) {
    garden(id: $id) {
      garden {
        name
      }
      errors {
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
      errors {
        message
      }
    }
  }
  `

const createGardenMutation = `
mutation CreateGarden($name: String!) {
    createGarden(name: $name) {
      garden {
        name
      }
      errors {
        message
      }
    }
  }
  `

describe('the garden query', () => {
  it('returns the name of an existing garden', async () => {
    const response = await callGraphQL({
      source: gardenQuery,
      variableValues: { id: garden.id },
      authorizationHeader: token,
    })
    expect(response?.data?.garden.garden.name).toBe('Default Garden')
  })
})

describe('the gardens query', () => {
  it('returns a list of gardens', async () => {
    const response = await callGraphQL({
      source: gardensQuery,
      authorizationHeader: token,
    })
    expect(response?.data?.gardens.gardens.includes({ name: 'Default Garden' }))
  })
})

describe('the createGarden mutation', () => {
  const name: string = faker.commerce.productName()
  let response: any

  beforeAll(async () => {
    response = await callGraphQL({
      source: createGardenMutation,
      variableValues: { name },
      authorizationHeader: token,
    })
  })

  it('inserts a garden into the database', async () => {
    const garden = await Garden.findOne({ where: { name } })
    expect(garden).toBeTruthy()
  })

  it('returns its name after creation', async () => {
    expect(response).toMatchObject({
      data: {
        createGarden: {
          garden: {
            name,
          },
        },
      },
    })
  })
})

async function createUserInDatabase(): Promise<User> {
  const user = User.create({
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  })
  await connection.manager.save(user)
  return user
}

async function createGardenInDatabase(
  owner: User,
  name: string
): Promise<Garden> {
  const garden = Garden.create({
    name,
    owner,
  })
  return await garden.save()
}
