import faker from 'faker'
import { Species } from '../../src/entities'

const name = faker.lorem.word()

export async function createSpeciesInDatabase(
  commonName: string = name,
  otherCommonName: string = faker.lorem.word(),
  pluralName: string = name + 's',
  isVegetable = true,
  isHerb = false,
  isFruit = false,
  isCommon = false,
  slug = name.toLowerCase(),
  scientificName = `${faker.lorem.word()} ${faker.lorem.word()}`
): Promise<Species> {
  const species = Species.create({
    commonName,
    otherCommonName,
    pluralName,
    isVegetable,
    isHerb,
    isFruit,
    isCommon,
    slug,
    scientificName
  })
  return await species.save()
}
