import { Connection } from 'typeorm'
import { createVarietyInDatabase, testConnection } from '../testUtils'
import { Variety } from '../../src/entities'

let connection: Connection
let variety: Variety

beforeAll(async () => {
  connection = await testConnection()
  variety = await createVarietyInDatabase()
})

afterAll(async () => {
  connection.close()
})

it('should have expected properties', () => {
  const keys = Object.keys(variety)
  const properties = [
    'id',
    'basicType',
    'variety',
    'instructionsFor',
    'sproutsIn',
    'idealTemp',
    'seedDepth',
    'spaceApart',
    'minSun',
    'growingTips',
    'frostResistant',
    'heatResistant',
  ]
  properties.forEach((property) => {
    expect(keys.includes(property)).toBe(true)
  })
})

it('should have propery types of the expected type', () => {
  expect(Number.isInteger(variety.id)).toBe(true)
  expect(typeof variety.basicType).toBe('string')
  expect(typeof variety.variety).toBe('string')
  expect(typeof variety.instructionsFor).toBe('string')
  expect(typeof variety.sproutsIn).toBe('string')
  expect(typeof variety.idealTemp).toBe('string')
  expect(typeof variety.seedDepth).toBe('string')
  expect(typeof variety.spaceApart).toBe('string')
  expect(typeof variety.minSun).toBe('string')
  expect(typeof variety.growingTips).toBe('string')
  expect(typeof variety.frostResistant).toBe('boolean')
  expect(typeof variety.heatResistant).toBe('boolean')
})
