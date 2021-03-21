/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Resolver, Query, Mutation, Arg, Int, Ctx } from 'type-graphql'
import { Garden } from '../entities/Garden'
import { errorResponse } from '../utils/errorResponse'
import { Context } from '../types/Context'
import { getUserIdFromRequest } from '../utils/getUserIdFromRequest'
import { User } from '../entities/User'
import { ApolloError } from 'apollo-server'

@Resolver()
export class GardenResolver {
  @Query(() => Garden)
  async garden(@Arg('id', () => Int) id: number) {
    return await Garden.findOne(id)
  }

  @Query(() => [Garden])
  async gardens(@Ctx() { req }: Context) {
    try {
      const ownerId = getUserIdFromRequest(req)
      const gardens = await Garden.find({ where: { ownerId } })
      return gardens
    } catch (err) {
      throw new ApolloError(err.message)
    }
  }

  @Mutation(() => Garden)
  async createGarden(@Arg('name') name: string, @Ctx() { req }: Context) {
    try {
      const ownerId = getUserIdFromRequest(req) as number
      const owner = await User.findOne({ id: ownerId })
      const garden = Garden.create({
        name,
        owner,
      })
      const response = await garden.save()
      return response
    } catch (err) {
      throw new ApolloError(err.message)
    }
  }
}
