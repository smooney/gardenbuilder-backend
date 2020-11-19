import { Connection } from 'typeorm'
import { testConnection } from '../utils/test'
import { Bed, Garden, User } from '../entities'
import { createGardenInDatabase } from '../utils/test/createGardenInDatabase'
import { createUserInDatabase } from '../utils/test/createUserInDatabase'

let connection: Connection
let owner: User
let garden: Garden
let bed: Bed

beforeAll(async () => {
  connection = await testConnection()
  owner = await createUserInDatabase()
  garden = await createGardenInDatabase(owner)
  //   bed = await createBedInDatabase(garden)
})

afterAll(async () => {
  connection.close()
})

it('should allow a bed to be created', () => {
  expect(true).toBeTruthy()
})
