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
import argon2 from 'argon2'
import { User } from '../entities/User'
import { Response } from '../types/Response'
import { errorResponse } from '../libs/errorResponse'

@ObjectType()
class UserResponse extends Response {
  @Field(() => User, { nullable: true })
  user?: User
}

@Resolver()
export class UserResolver {
  @Query(() => UserResponse)
  async user(@Arg('id', () => Int) id: number) {
    const user = await User.findOne(id)
    if (!user) {
      return errorResponse('User not found')
    }
    return { user }
  }

  @Query(() => [User])
  users() {
    return User.find()
  }

  @Mutation(() => UserResponse)
  async createUser(
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    if (!/@/i.test(email)) {
      return errorResponse('Not a valid email address')
    }

    try {
      const hashedPassword = await argon2.hash(password)
      const user = User.create({ email, password: hashedPassword })
      await user.save()
      return { user }
    } catch (err) {
      const errorMessage =
        err.code === '23505' ? 'User already exists' : err.message
      return errorResponse(errorMessage)
    }
  }
}
