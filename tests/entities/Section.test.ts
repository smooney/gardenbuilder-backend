import { Connection } from 'typeorm'
import {
  createBed,
  createGarden,
  createSectionInDatabase,
  createUser,
  testConnection,
} from '../testUtils'
import { Bed, Garden, Section, User } from '../../src/entities'

let connection: Connection
let owner: User
let garden: Garden
let bed: Bed
let section: Section

beforeAll(async () => {
  connection = await testConnection()
  owner = createUser()
  garden = createGarden(owner)
  bed = createBed(garden)
  section = await createSectionInDatabase(bed)
})

afterAll(async () => {
  connection.close()
})

it('should have expected properties', () => {
  const keys = Object.keys(section)
  const properties = [
    'id',
    'xPosition',
    'yPosition',
    'bedId',
    'plantType',
    'createdAt',
    'updatedAt',
  ]
  properties.forEach((property) => {
    expect(keys.includes(property)).toBe(true)
  })
})

it('should have propery types of the expected type', () => {
  expect(Number.isInteger(section.id)).toBe(true)
  expect(Number.isInteger(section.xPosition)).toBe(true)
  expect(Number.isInteger(section.yPosition)).toBe(true)
  expect(Number.isInteger(section.bedId)).toBe(true)
  expect(typeof section.plantType).toBe('string')
  expect(section.createdAt instanceof Date).toBe(true)
  expect(section.updatedAt instanceof Date).toBe(true)
})
