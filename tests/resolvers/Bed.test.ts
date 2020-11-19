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

// const gardenQuery = `
// query Garden($id: Int!) {
//     garden(id: $id) {
//       garden {
//         name
//       }
//       errors {
//         message
//       }
//     }
//   }
//   `

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

// const createGardenMutation = `
// mutation CreateGarden($name: String!) {
//     createGarden(name: $name) {
//       garden {
//         name
//       }
//       errors {
//         message
//       }
//     }
//   }
//   `

// describe('the garden query', () => {
//   it('returns the name of an existing garden', async () => {
//     const response = await callGraphQL({
//       source: gardenQuery,
//       variableValues: { id: garden.id },
//       authorizationHeader: token,
//     })
//     expect(response?.data?.garden.garden.name).toBe('Default Garden')
//   })
// })

describe('the beds query', () => {
  it('returns a list of beds', async () => {
    const response = await callGraphQL({
      source: bedsQuery,
      authorizationHeader: token,
    })
    expect(response?.data?.beds.beds.includes({ name: bed.name }))
  })
})

// describe('the createGarden mutation', () => {
//   const name: string = faker.commerce.productName()
//   let response: any

//   beforeAll(async () => {
//     response = await callGraphQL({
//       source: createGardenMutation,
//       variableValues: { name },
//       authorizationHeader: token,
//     })
//   })

//   it('inserts a garden into the database', async () => {
//     const garden = await Garden.findOne({ where: { name } })
//     expect(garden).toBeTruthy()
//   })

//   it('returns its name after creation', async () => {
//     expect(response).toMatchObject({
//       data: {
//         createGarden: {
//           garden: {
//             name,
//           },
//         },
//       },
//     })
//   })
// })
