import { Connection } from 'typeorm'
import { createSpeciesInDatabase, testConnection } from '../testUtils'
import { Species } from '../../src/entities'

let connection: Connection
let species: Species

beforeAll(async () => {
  connection = await testConnection()
  species = await createSpeciesInDatabase()
})

afterAll(async () => {
  connection.close()
})

it('should have expected properties', () => {
  const keys = Object.keys(species)
  const properties = [
    'id',
    'commonName',
    'pluralName',
    'otherCommonName',
    'isVegetable',
    'isHerb',
    'isFruit',
    'isCommon',
    'slug',
    'scientificName',
    'createdAt',
    'updatedAt',
  ]
  properties.forEach((property) => {
    expect(keys.includes(property)).toBe(true)
  })
})

it('should have propery types of the expected type', () => {
  expect(Number.isInteger(species.id)).toBe(true)
  expect(typeof species.commonName).toBe('string')
  expect(typeof species.pluralName).toBe('string')
  expect(typeof species.otherCommonName).toBe('string')
  expect(typeof species.isVegetable).toBe('boolean')
  expect(typeof species.slug).toBe('string')
  expect(typeof species.scientificName).toBe('string')
  expect(species.createdAt instanceof Date).toBe(true)
  expect(species.updatedAt instanceof Date).toBe(true)
})
