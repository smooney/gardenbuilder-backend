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

it('should have expected properties', () => {
  const keys = Object.keys(bed)
  const properties = [
    'id',
    'name',
    'endedAt',
    'isActive',
    'gardenId',
    'createdAt',
    'updatedAt',
  ]
  properties.forEach((property) => {
    expect(keys.includes(property)).toBe(true)
  })
})

it('should have propery types of the expected type', () => {
  expect(Number.isInteger(bed.id)).toBe(true)
  expect(typeof bed.name).toBe('string')
  expect(bed.endedAt instanceof Date).toBe(true)
  expect(typeof bed.isActive).toBe('boolean')
  expect(bed.gardenId).toEqual(garden.id)
  expect(bed.createdAt instanceof Date).toBe(true)
  expect(bed.updatedAt instanceof Date).toBe(true)
})
