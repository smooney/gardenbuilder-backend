import faker from 'faker'
import { Variety } from '../../src/entities'

export async function createVarietyInDatabase(
  basicType: string = faker.lorem.word(),
  variety: string = faker.lorem.word(),
  instructionsFor: string = faker.lorem.sentence(),
  sproutsIn: string = faker.random.number.toString(),
  idealTemp: string = faker.random.number.toString(),
  seedDepth: string = faker.random.number.toString(),
  spaceApart = `${faker.random.number.toString()} cm`,
  minSun = `${faker.random.number.toString()} hours`,
  growingTips: string = faker.lorem.sentence()
): Promise<Variety> {
  const species = Variety.create({
    basicType,
    variety,
    instructionsFor,
    sproutsIn,
    idealTemp,
    seedDepth,
    spaceApart,
    minSun,
    growingTips,
  })
  return await species.save()
}
