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

// @ObjectType()
// class UserResponse extends Response {
//   @Field(() => User, { nullable: true })
//   user?: User
// }

@ObjectType()
class GardensResponse extends Response {
  @Field(() => [Garden], { nullable: true })
  gardens?: Garden[]
}

// @ObjectType()
// class CreateUserResponse extends UserResponse {
//   @Field(() => String, { nullable: true })
//   token?: string
// }

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

  //   @Mutation(() => CreateUserResponse)
  //   async createUser(
  //     @Arg('email') email: string,
  //     @Arg('password') password: string,
  //     @Arg('firstName') firstName: string,
  //     @Arg('lastName') lastName: string
  //   ) {
  //     if (!/@/i.test(email)) {
  //       return errorResponse('Not a valid email address')
  //     }
  //     try {
  //       const user = User.create({
  //         email,
  //         password: hashedPassword,
  //         firstName,
  //         lastName,
  //       })
  //       const token = assign(email)
  //       await user.save()
  //       return { user, token }
  //     } catch (err) {
  //       const errorMessage =
  //         err.code === '23505' ? 'User already exists' : err.message
  //       return errorResponse(errorMessage)
  //     }
  //   }
}
