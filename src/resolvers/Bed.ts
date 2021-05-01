/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ApolloError } from 'apollo-server'
import { Resolver, Query, Mutation, Arg, Int } from 'type-graphql'
import { Bed } from '../entities/Bed'
import { Garden } from '../entities/Garden'

@Resolver()
export class BedResolver {
  @Query(() => Bed)
  async bed(@Arg('id', () => Int) id: number) {
    return await Bed.findOne(id)
  }

  @Query(() => [Bed], { nullable: true })
  async beds(@Arg('gardenId', () => Int) gardenId: number) {
    const garden: Garden | undefined = await Garden.findOne({
      where: { id: gardenId },
    })
    const beds = Bed.find({ where: { gardenId: garden?.id } })
    return beds
  }

  @Mutation(() => Bed)
  async createBed(
    @Arg('gardenId', () => Int) gardenId: number,
    @Arg('name', () => String) name: string
    // @Ctx() { req }: Context
  ) {
    // TODO: Validate that garden belongs to owner
    // const ownerId = getUserIdFromRequest(req) as number
    //  const owner = await User.findOne({ id: ownerId })
    try {
      const garden = await Garden.findOne({ id: gardenId })
      const bed = Bed.create({
        gardenId,
        garden,
        name,
      })
      return await bed.save()
    } catch (err) {
      throw new ApolloError(err.message)
    }
  }
}
