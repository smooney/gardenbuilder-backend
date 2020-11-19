/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Resolver, Query, Mutation, Arg, Int, Ctx } from 'type-graphql'
import { Bed, Garden } from '../entities'
import { errorResponse, getUserIdFromRequest } from '../utils'
import { Context, BedResponse, BedsResponse } from '../types'

@Resolver()
export class BedResolver {
  // @Query(() => GardenResponse)
  // async garden(@Arg('id', () => Int) id: number) {
  //   const garden = await Garden.findOne(id)
  //   if (!garden) {
  //     return errorResponse('Garden not found')
  //   }
  //   return { garden }
  // }

  @Query(() => BedsResponse)
  async beds(@Arg('gardenId') gardenId: number, @Ctx() { req }: Context) {
    try {
      // TODO: Add check for if garden belongs to user
      // const ownerId = getUserIdFromRequest(req)
      const garden: Garden | undefined = await Garden.findOne({
        where: { id: gardenId },
      })
      const beds = Bed.find({ where: { gardenId: garden?.id } })
      return { beds }
    } catch (err) {
      return errorResponse(err.message)
    }
  }

  // @Mutation(() => GardenResponse)
  // async createGarden(@Arg('name') name: string, @Ctx() { req }: Context) {
  //   const ownerId = getUserIdFromRequest(req) as number
  //   try {
  //     const owner = await User.findOne({ id: ownerId })
  //     const garden = Garden.create({
  //       name,
  //       owner,
  //     })
  //     await garden.save()
  //     return { garden }
  //   } catch (err) {
  //     return errorResponse(err.message)
  //   }
  // }
}
