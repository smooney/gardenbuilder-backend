import { Resolver, Query } from 'type-graphql'

@Resolver()
export class HelloWorld {
  @Query(() => String)
  hello() {
    return 'world'
  }
}
