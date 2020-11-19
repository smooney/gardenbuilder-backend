import { Connection } from 'typeorm'
import {
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

beforeAll(async () => {
  connection = await testConnection()
  owner = await createUserInDatabase()
  garden = await createGardenInDatabase(owner)
  bed = await createBedInDatabase(garden)
})

afterAll(async () => {
  connection.close()
})

it('should allow a bed to be created', () => {
  console.log(bed)
  expect(bed).toBeTruthy()
})
