import { Connection } from 'typeorm'
import { createPlantOptionInDatabase, testConnection } from '../testUtils'
import { PlantOption } from '../../src/entities'

let connection: Connection
let plantOption: PlantOption

beforeAll(async () => {
  connection = await testConnection()
  plantOption = await createPlantOptionInDatabase()
})

afterAll(async () => {
  connection.close()
})

it('should have expected properties', () => {
  const keys = Object.keys(plantOption)
  const properties = [
    'id',
    'common_name',
    'other_common_name',
    'type',
    'is_vegetable',
    'is_herb',
    'is_fruit',
    'is_common',
    'createdAt',
    'updatedAt',
  ]
  properties.forEach((property) => {
    expect(keys.includes(property)).toBe(true)
  })
})

it('should have propery types of the expected type', () => {
  expect(Number.isInteger(plantOption.id)).toBe(true)
  expect(typeof plantOption.common_name).toBe('string')
  expect(typeof plantOption.other_common_name).toBe('string')
  expect(typeof plantOption.type).toBe('string')
  expect(typeof plantOption.is_vegetable).toBe('boolean')
  expect(plantOption.createdAt instanceof Date).toBe(true)
  expect(plantOption.updatedAt instanceof Date).toBe(true)
})
