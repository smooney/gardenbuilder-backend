import { Field, ObjectType } from 'type-graphql'
import { Bed } from '../entities'
import { Response } from './Response'

@ObjectType()
export class BedResponse extends Response {
  @Field(() => Bed, { nullable: true })
  bed?: Bed
}
