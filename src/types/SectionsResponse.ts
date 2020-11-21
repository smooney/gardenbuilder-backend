import { Field, ObjectType } from 'type-graphql'
import { Section } from '../entities'
import { Response } from './Response'

@ObjectType()
export class SectionsResponse extends Response {
  @Field(() => [Section], { nullable: true })
  sections?: Section[]
}
