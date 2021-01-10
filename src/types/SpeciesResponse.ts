import { Field, ObjectType } from 'type-graphql'
import { Species } from '../entities'
import { Response } from './Response'

@ObjectType()
export class SpeciesResponse extends Response {
  @Field(() => [Species], { nullable: true })
  species?: Species[]
}
