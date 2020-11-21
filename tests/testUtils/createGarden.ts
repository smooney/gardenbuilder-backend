import faker from 'faker'
import { Garden, User } from '../../src/entities'

export function createGarden(
  owner: User,
  name: string = faker.commerce.productName()
): Garden {
  const garden = Garden.create({
    name,
    owner,
  })
  return garden
}
