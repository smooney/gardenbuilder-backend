/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Resolver, Query, Mutation, Arg, Int, Ctx } from 'type-graphql'
import { Garden } from '../entities/Garden'
import { errorResponse } from '../utils/errorResponse'
import { Context } from '../types/Context'
import { getUserIdFromRequest } from '../utils/getUserIdFromRequest'
import { GardenResponse, GardensResponse } from '../types'
import { User } from '../entities/User'

@Resolver()
export class GardenResolver {
  @Query(() => GardenResponse)
  async garden(@Arg('id', () => Int) id: number) {
    const garden = await Garden.findOne(id)
    if (!garden) {
      return errorResponse('Garden not found')
    }
    return { garden }
  }

  @Query(() => GardensResponse)
  gardens(@Ctx() { req }: Context) {
    try {
      const ownerId = getUserIdFromRequest(req)
      const gardens = Garden.find({ where: { ownerId } })
      return { gardens }
    } catch (err) {
      return errorResponse(err.message)
    }
  }

  @Mutation(() => GardenResponse)
  async createGarden(@Arg('name') name: string, @Ctx() { req }: Context) {
    const ownerId = getUserIdFromRequest(req) as number
    try {
      const owner = await User.findOne({ id: ownerId })
      const garden = Garden.create({
        name,
        owner,
      })
      await garden.save()
      return { garden }
    } catch (err) {
      return errorResponse(err.message)
    }
  }
}
