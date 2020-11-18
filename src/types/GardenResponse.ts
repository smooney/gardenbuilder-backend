import { Field, ObjectType } from 'type-graphql'
import { Garden } from '../entities/Garden'
import { Response } from '../types/Response'

@ObjectType()
export class GardenResponse extends Response {
  @Field(() => Garden, { nullable: true })
  garden?: Garden
}
