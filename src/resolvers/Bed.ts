/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Resolver, Query, Mutation, Arg, Int, Ctx } from 'type-graphql'
import { Bed, Garden } from '../entities'
import { errorResponse, getUserIdFromRequest } from '../utils'
import { Context, BedResponse, BedsResponse } from '../types'

@Resolver()
export class BedResolver {
  @Query(() => BedResponse)
  async bed(@Arg('id', () => Int) id: number) {
    const bed = await Bed.findOne(id)
    if (!bed) {
      return errorResponse('Bed not found')
    }
    return { bed }
  }

  @Query(() => BedsResponse)
  async beds(@Arg('gardenId') gardenId: number, @Ctx() { req }: Context) {
    try {
      const garden: Garden | undefined = await Garden.findOne({
        where: { id: gardenId },
      })
      const beds = Bed.find({ where: { gardenId: garden?.id } })
      return { beds }
    } catch (err) {
      return errorResponse(err.message)
    }
  }

  @Mutation(() => BedResponse)
  async createBed(
    @Arg('gardenId', () => Int) gardenId: number,
    @Arg('name', () => String, { nullable: true }) name: string,
    @Ctx() { req }: Context
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
      await bed.save()
      return { bed }
    } catch (err) {
      return errorResponse(err.message)
    }
  }
}
