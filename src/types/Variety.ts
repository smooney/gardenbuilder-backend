import { ID, Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Variety {
  @Field(() => ID)
  id: number

  @Field(() => String)
  commonName: string

  @Field(() => String)
  slug: string

  @Field(() => String)
  scientificName: string

  @Field(() => String)
  imageUrl: string

  @Field(() => String)
  genus: string

  @Field(() => String)
  family: string
}
