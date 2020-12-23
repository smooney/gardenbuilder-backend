/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Resolver,
  Query,
  Field,
  Mutation,
  Arg,
  Int,
  ObjectType,
  Ctx,
} from 'type-graphql'
import argon2 from 'argon2'
import { User } from '../entities/User'
import { Response } from '../types/Response'
import { errorResponse } from '../utils/errorResponse'
import jwt from '../utils/jwt'
import { Context } from '../types/Context'
import { getUserIdFromRequest } from '../utils/getUserIdFromRequest'

@ObjectType()
class UserResponse extends Response {
  @Field(() => User, { nullable: true })
  user?: User
}

@ObjectType()
class UsersResponse extends Response {
  @Field(() => [User], { nullable: true })
  users?: User[]
}

@ObjectType()
class CreateUserResponse extends UserResponse {
  @Field(() => String, { nullable: true })
  token?: string
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

  @Query(() => UserResponse)
  async currentUser(@Ctx() { req }: Context) {
    const id = getUserIdFromRequest(req) as number
    const user = await User.findOne({ id })
    if (!user) {
      return errorResponse('User not found')
    }
    return { user }
  }

  @Query(() => UsersResponse)
  users() {
    try {
      const users = User.find()
      return { users }
    } catch (err) {
      return errorResponse(err.message)
    }
  }

  @Mutation(() => CreateUserResponse)
  async createUser(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string
  ) {
    if (!/@/i.test(email)) {
      return errorResponse('Not a valid email address')
    }
    try {
      const hashedPassword = await argon2.hash(password)
      const user = User.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      })
      const { id } = await user.save()
      const token = jwt.assign(id.toString())
      return { user, token }
    } catch (err) {
      const errorMessage =
        err.code === '23505' ? 'User already exists' : err.message
      return errorResponse(errorMessage)
    }
  }

  @Mutation(() => CreateUserResponse)
  async authenticateUser(
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    if (!/@/i.test(email)) {
      return errorResponse('Not a valid email address')
    }
    try {
      const user = await User.findOne({
        where: { email },
      })
      if (user) {
        const token = await getTokenIfPasswordIsValid(user)
        if (token) {
          return { user, token }
        }
      }
      return errorResponse('User does not exist')
    } catch (err) {
      return errorResponse(err.message)
    }

    async function getTokenIfPasswordIsValid(
      user: User
    ): Promise<string | null> {
      const passwordIsValid = await argon2.verify(user?.password, password)
      const token = jwt.assign(user.id.toString())
      return passwordIsValid ? token : null
    }
  }
}
