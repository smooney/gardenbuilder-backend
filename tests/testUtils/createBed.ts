import faker from 'faker'
import { Bed, Garden } from '../../src/entities'

export function createBed(
  garden: Garden,
  name: string = faker.commerce.productName()
): Bed {
  const bed = Bed.create({
    garden,
    name,
  })
  return bed
}
