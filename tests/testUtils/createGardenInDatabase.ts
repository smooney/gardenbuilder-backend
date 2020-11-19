import faker from 'faker'
import { Garden, User } from '../../src/entities'

export async function createGardenInDatabase(
  owner: User,
  name: string = faker.commerce.productName()
): Promise<Garden> {
  const garden = Garden.create({
    name,
    owner,
  })
  return await garden.save()
}
