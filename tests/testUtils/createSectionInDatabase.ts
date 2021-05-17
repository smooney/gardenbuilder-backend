import faker from 'faker'
import { Bed, Section } from '../../src/entities'

export async function createSectionInDatabase(
  bed: Bed,
  xPosition: number = faker.datatype.number({ min: 0, max: 10 }),
  yPosition: number = faker.datatype.number({ min: 0, max: 10 }),
  plantType = 'Tomato'
): Promise<Section> {
  const section = Section.create({
    bed,
    xPosition,
    yPosition,
    plantType,
  })
  return await section.save()
}
