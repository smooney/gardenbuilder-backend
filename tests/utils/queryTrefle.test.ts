import { getPlantTypes, getVarieties } from '../../src/utils'

type PlantType = {
  id: number
  common_name: string
}

let plantTypes: PlantType[]

beforeAll(async () => {
  plantTypes = await getPlantTypes()
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
