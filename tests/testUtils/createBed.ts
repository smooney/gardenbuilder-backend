import faker from 'faker'
import { Bed, Garden } from '../../src/entities'

export function createBed(
  garden: Garden,
  name: string = faker.commerce.productName(),
  width = 4,
  height = 4,
  unitOfMeasurement = 'ft'
): Bed {
  const bed = Bed.create({
    garden,
    name,
    width,
    height,
    unitOfMeasurement,
  })
  return bed
}
