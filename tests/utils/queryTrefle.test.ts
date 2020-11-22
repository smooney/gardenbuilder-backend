import { getPlantTypes } from '../../src/utils'

type PlantType = {
  id: number
  common_name: string
}

describe('getPlantTypes', () => {
  let plantTypes: PlantType[]

  beforeAll(async () => {
    plantTypes = await getPlantTypes()
  })

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
