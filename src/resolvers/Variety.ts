/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ApolloError } from 'apollo-server'
import { Arg, Resolver, Query } from 'type-graphql'
import { createQueryBuilder } from 'typeorm'
// import { BasicType } from '../types'
import { Variety } from '../entities/Variety'

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
}
