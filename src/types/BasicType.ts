import { Field, ObjectType } from 'type-graphql'

@ObjectType({ description: "The basicType model"})
export class BasicType {
  @Field(() => String, { nullable: true })
  basicType?: string
}
