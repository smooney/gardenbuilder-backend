import faker from 'faker'
import { User } from '../../entities/User'
import { Garden } from '../../entities/Garden'

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
