/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Resolver,
  Query,
  Field,
  Mutation,
  Arg,
  Int,
  ObjectType,
} from 'type-graphql'
import { Garden } from '../entities/Garden'
import { Response } from '../types/Response'
import { errorResponse } from '../libs/errorResponse'
import { assign } from '../libs/jwt'

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
  gardens() {
    try {
      const gardens = Garden.find()
      return { gardens }
    } catch (err) {
      return errorResponse(err.message)
    }
  }

  @Mutation(() => GardenResponse)
  async createGarden(@Arg('name') name: string) {
    try {
      const garden = Garden.create({
        name,
      })
      await garden.save()
      return { garden }
    } catch (err) {
      return errorResponse(err.message)
    }
  }
}
