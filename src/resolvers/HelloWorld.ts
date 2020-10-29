import { Resolver, Query, UseMiddleware } from 'type-graphql'
import { isAuthorized } from '../middleware/isAuthorized'

@Resolver()
export class HelloWorld {
  // @Authorized()
  @Query(() => String)
  @UseMiddleware(isAuthorized)
  hello(): string {
    return 'world'
  }
}
