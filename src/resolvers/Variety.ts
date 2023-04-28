/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ApolloError } from 'apollo-server'
import { Arg, Mutation, Resolver, Query, InputType, Field } from 'type-graphql'
import { createQueryBuilder } from 'typeorm'
// import { BasicType } from '../types'
import { Variety } from '../entities/Variety'

@InputType()
class UpdateVarietyDetails implements Partial<Variety> {
  @Field()
  id: number

  @Field()
  variety: string

  @Field()
  basicType: string
}

@Resolver()
export class VarietyResolver {
  @Query(() => [String])
  async basicTypes(
    @Arg('name', { nullable: true }) name: string
    // @Arg('isFlower', { nullable: true }) isFlower: boolean,
    // @Arg('isFruit', { nullable: true }) isFruit: boolean,
    // @Arg('isHerb', { nullable: true }) isHerb: boolean,
    // @Arg('isVegetable', { nullable: true }) isVegetable: boolean
  ): Promise<any[]> {
    try {
      let query = createQueryBuilder()
        .select('variety.basicType AS basicType')
        .from(Variety, 'variety')
        .distinct(true)

      if (name)
        query = query.where('variety.basicType ilike :name', {
          name: `%${name}%`,
        })

      const basicTypes = await query.getRawMany()

      return basicTypes.map((obj) => obj.basictype)
    } catch (err) {
      throw new ApolloError(err.message)
    }
  }

  @Query(() => [Variety])
  async varieties() {
    try {
      return await Variety.find()
    } catch (err) {
      throw new ApolloError(err.message)
    }
  }

  @Mutation(() => Variety)
  async createVariety(
    @Arg('basicType', () => String) basicType: string,
    @Arg('variety', () => String) variety: string
  ) {
    try {
      const newVariety = Variety.create({
        basicType,
        variety,
      })

      const response = await newVariety.save()
      return response
    } catch (err) {
      throw new ApolloError(err.message)
    }
  }

  @Mutation(() => Variety)
  async updateVariety(
    @Arg('input') input: UpdateVarietyDetails
  ) {
    const variety = await Variety.findOne({id: input.id}) 

    if (input.variety && variety) {
      variety.variety = input.variety
    }

    return await variety?.save()
  }
}
