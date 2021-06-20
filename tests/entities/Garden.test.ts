import { Connection } from 'typeorm'
import {
  createGarden,
  createUser,
  testConnection,
} from '../testUtils'
import { Garden, User } from '../../src/entities'

let connection: Connection
let owner: User
let garden: Garden

beforeAll(async () => {
  connection = await testConnection()
  owner = createUser()
  garden = await Garden.save(createGarden(owner))
})

afterAll(async () => {
  connection.close()
})

it('should have expected properties', async () => {
  const keys = Object.keys(garden).sort()
  const properties = [
    'createdAt',
    'endedAt',
    'id',
    'isActive',
    'name',
    'owner',
    'ownerId',
    'updatedAt',
  ]
  properties.forEach((property) => {
    expect(keys.includes(property)).toBe(true)
  })
})

it('should have propery types of the expected type', () => {
  expect(garden.createdAt instanceof Date).toBe(true)
  expect(garden.endedAt instanceof Date).toBe(true)
  expect(Number.isInteger(garden.id)).toBe(true)
  expect(typeof garden.isActive).toBe('boolean')
  expect(typeof garden.name).toBe('string')
  expect(owner).toBeInstanceOf(User)
  expect(Number.isInteger(garden.ownerId)).toBe(true)
  expect(garden.updatedAt instanceof Date).toBe(true)
})