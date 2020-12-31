import { Field, ObjectType } from 'type-graphql'
import { Response } from './Response'
import { Variety } from '../entities'

@ObjectType()
export class VarietiesResponse extends Response {
  @Field(() => [Variety], { nullable: true })
  varieties?: Variety[]
}
