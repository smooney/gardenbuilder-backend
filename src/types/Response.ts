import { Field, ObjectType } from 'type-graphql'
import { Error } from '../types/Error'

@ObjectType()
export class Response {
  @Field(() => [Error], { nullable: true })
  errors?: Error[]
}
