/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Resolver,
  Query,
  Field,
  Mutation,
  Arg,
  ObjectType,
  Int,
  Ctx,
} from 'type-graphql'
import { Garden } from '../entities/Garden'
import { Response } from '../types/Response'
import { errorResponse } from '../libs/errorResponse'
import { Context } from '../types/Context'
import { getUserIdFromRequest } from '../libs/getUserIdFromRequest'

@ObjectType()
class GardenResponse extends Response {
  @Field(() => Garden, { nullable: true })
  garden?: Garden
}

@ObjectType()
class GardensResponse extends Response {
  @Field(() => [Garden], { nullable: true })
  gardens?: Garden[]
}

@Resolver()
export class GardenResolver {
  //   @Query(() => UserResponse)
  //   async user(@Arg('id', () => Int) id: number) {
  //     const user = await User.findOne(id)
  //     if (!user) {
  //       return errorResponse('User not found')
  //     }
  //     return { user }
  //   }

  @Query(() => GardensResponse)
  gardens(@Ctx() { req }: Context) {
    try {
      const userId = getUserIdFromRequest(req)
      const gardens = Garden.find({ where: { userId } })
      return { gardens }
    } catch (err) {
      return errorResponse(err.message)
    }
  }

  @Mutation(() => GardenResponse)
  async createGarden(@Arg('name') name: string, @Ctx() { req }: Context) {
    const ownerId = getUserIdFromRequest(req) as number
    try {
      const garden = Garden.create({
        name,
        ownerId,
      })
      await garden.save()
      return { garden }
    } catch (err) {
      return errorResponse(err.message)
    }
  }
}
