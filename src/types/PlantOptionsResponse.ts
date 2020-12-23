import { Field, ObjectType } from 'type-graphql'
import { PlantOption } from '../entities'
import { Response } from './Response'

@ObjectType()
export class PlantOptionsResponse extends Response {
  @Field(() => [PlantOption], { nullable: true })
  plantOptions?: PlantOption[]
}
