import { Field, ObjectType } from 'type-graphql'
import { Garden } from '../entities/Garden'
import { Response } from './Response'

@ObjectType()
export class GardensResponse extends Response {
  @Field(() => [Garden], { nullable: true })
  gardens?: Garden[]
}
