/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Resolver, Query, InputType, Field, Mutation, Arg } from 'type-graphql'
import { User } from '../entities/User'

@InputType()
class EmailPasswordInput {
  @Field()
  email: string
  @Field()
  password: string
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users() {
    return User.find()
  }

  @Mutation(() => User)
  async createUser(@Arg('options') options: EmailPasswordInput) {
    const user = User.create(options)
    await user.save()
    return user
  }
}
