import faker from 'faker'
import { PlantOption } from '../../src/entities'

export async function createPlantOptionInDatabase(
  commonName: string = faker.lorem.word(),
  otherCommonName: string = faker.lorem.word(),
  isVegetable = true,
  isHerb = false,
  isFruit = false,
  isCommon = false
): Promise<PlantOption> {
  const plantOption = PlantOption.create({
    commonName,
    otherCommonName,
    isVegetable,
    isHerb,
    isFruit,
    isCommon,
  })
  return await plantOption.save()
}
