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
import jwt from '../utils/jwt'
import { Context } from '../types/Context'
import { getTokenIfPasswordIsValid, getUserIdFromRequest } from '../utils'
import { ApolloError } from 'apollo-server'

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
      throw new ApolloError('We could not find a user with that id')
    }
    return { user }
  }

  @Query(() => UserResponse)
  async currentUser(@Ctx() { req }: Context) {
    const id = getUserIdFromRequest(req) as number
    const user = await User.findOne({ id })
    if (!user) {
      throw new ApolloError('We could not find a user with that id')
    }
    return { user }
  }

  @Query(() => UsersResponse)
  users() {
    try {
      const users = User.find()
      return { users }
    } catch (err) {
      throw new ApolloError(err.message)
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
      throw new ApolloError('Not a valid email address')
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
      throw new ApolloError(errorMessage)
    }
  }

  @Mutation(() => CreateUserResponse)
  async authenticateUser(
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    if (!/@/i.test(email)) {
      throw new ApolloError('Not a valid email address')
    }
    try {
      const user = await User.findOne({
        where: { email },
      })
      if (user) {
        const token = await getTokenIfPasswordIsValid(user, password)
        if (token) {
          return { user, token }
        }
        throw new ApolloError('Invalid password')
      }
      throw new ApolloError('User does not exist')
    } catch (err) {
      throw new ApolloError(err.message)
    }
  }
}
