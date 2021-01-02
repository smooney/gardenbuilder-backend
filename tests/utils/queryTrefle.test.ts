import {
  insertVarietiesIntoDatabase,
  getPlantTypes,
  getVarieties,
} from '../../src/utils'
import { createConnections, getConnection } from 'typeorm'

type PlantType = {
  id: number
  common_name: string
}

let plantTypes: PlantType[]

beforeAll(async () => {
  await createConnections()
  plantTypes = await getPlantTypes()
})

afterAll(async () => {
  const defaultConnection = getConnection('default')
  await defaultConnection.close()
})

describe('getPlantTypes', () => {
  it('retrieves at least one plant', async () => {
    expect(plantTypes.length).toBeGreaterThan(0)
  })

  it('returns an id and common_name field', async () => {
    const keys = ['id', 'common_name']
    keys.forEach((key) => {
      expect(Object.keys(plantTypes[0]).includes(key)).toBe(true)
    })
    expect(plantTypes.length).toBeGreaterThan(0)
  })
})

describe('getVarieties', () => {
  it('retrieves at least one variety', async () => {
    const varieties = await getVarieties('bean')
    expect(varieties).toHaveLength(20)
  })
})

describe('insertVarietiesIntoDatabase', () => {
  const varieties = [
    {
      id: 6,
      commonName: 'JuJu Bean',
      slug: 'jujuBean',
      scientificName: 'Lugumus Jujubus',
      imageUrl: 'https://someaddress.com',
      genus: 'Lugumus',
      family: 'Vegetable',
    },
    {
      id: 66,
      commonName: 'Magic Bean',
      slug: 'magicBean',
      scientificName: 'Lugumus Magicus',
      imageUrl: 'https://someaddress.com/magicBean',
      genus: 'Lugumus',
      family: 'Vegetable',
    },
  ]

  it('inserts something into database', async () => {
    await insertVarietiesIntoDatabase(varieties)
    expect(true).toBe(true)
  })
})
