import { Field, ObjectType } from 'type-graphql'
import { Bed } from '../entities'
import { Response } from './Response'

@ObjectType()
export class BedsResponse extends Response {
  @Field(() => [Bed], { nullable: true })
  beds?: Bed[]
}
