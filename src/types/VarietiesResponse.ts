import { Field, ObjectType } from 'type-graphql'
import { Response } from './Response'
import { PlantVariety } from '../entities'

@ObjectType()
export class VarietiesResponse extends Response {
  @Field(() => [PlantVariety], { nullable: true })
  varieties?: PlantVariety[]
}
