import faker from 'faker'
import { Connection } from 'typeorm'
import jwt from '../../src/utils/jwt'
import {
  callGraphQL,
  createBedInDatabase,
  createGardenInDatabase,
  createUserInDatabase,
  testConnection,
} from '../testUtils'
import { Bed, Garden, User } from '../../src/entities'

let connection: Connection
let owner: User
let garden: Garden
let bed: Bed
let token: string

beforeAll(async () => {
  connection = await testConnection()
  owner = await createUserInDatabase()
  garden = await createGardenInDatabase(owner)
  bed = await createBedInDatabase(garden)
  token = jwt.assign(owner.id.toString())
})

afterAll(async () => {
  connection.close()
})

const bedQuery = `
query Bed($id: Int!) {
    bed(id: $id) {
      bed {
        name
      }
      errors {
        message
      }
    }
  }
  `

const bedsQuery = `
query Beds {
    beds {
      beds {
        name
      }
      errors {
        message
      }
    }
  }
  `

const createBedMutation = `
mutation CreateBed($gardenId: Int!, $name: String) {
    createBed(gardenId: $gardenId, name: $name) {
      bed {
        name
      }
      errors {
        message
      }
    }
  }
  `

describe('the bed query', () => {
  it('returns the name of an existing bed', async () => {
    const response = await callGraphQL({
      source: bedQuery,
      variableValues: { id: bed.id },
      authorizationHeader: token,
    })
    expect(response?.data?.bed.bed.name).toBe(bed.name)
  })

  it('returns no beds if called with a nonexistent id', async () => {
    const FAKE_ID = 666
    const response = await callGraphQL({
      source: bedQuery,
      variableValues: { id: FAKE_ID },
      authorizationHeader: token,
    })
    expect(response?.data?.bed.bed).toBeNull()
  })
})

describe('the beds query', () => {
  it('returns a list of beds', async () => {
    const response = await callGraphQL({
      source: bedsQuery,
      authorizationHeader: token,
    })
    expect(response?.data?.beds.beds.includes({ name: bed.name }))
  })
})

describe('the createBed mutation', () => {
  let name: string
  let gardenId: number
  let response: any

  beforeAll(async () => {
    name = faker.commerce.productName()
    gardenId = garden.id

    response = await callGraphQL({
      source: createBedMutation,
      variableValues: { gardenId, name },
      authorizationHeader: token,
    })
  })

  it('inserts a bed into the database', async () => {
    const bed = await Bed.findOne({ where: { name } })
    expect(bed).toBeTruthy()
  })

  it('returns its name after creation if one is passed', async () => {
    expect(response).toMatchObject({
      data: {
        createBed: {
          bed: {
            name,
          },
        },
      },
    })
  })
})
