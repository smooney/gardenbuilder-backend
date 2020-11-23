import faker from 'faker'
import { PlantOption } from '../../src/entities'

export async function createPlantOptionInDatabase(
  common_name: string = faker.lorem.word(),
  other_common_name: string = faker.lorem.word(),
  type = 'vegetable',
  is_vegetable = true,
  is_herb = false,
  is_fruit = false,
  is_common = false
): Promise<PlantOption> {
  const plantOption = PlantOption.create({
    common_name,
    other_common_name,
    type,
    is_vegetable,
    is_herb,
    is_fruit,
    is_common,
  })
  return await plantOption.save()
}
