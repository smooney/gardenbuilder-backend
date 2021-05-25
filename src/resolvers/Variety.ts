/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ApolloError } from 'apollo-server'
import { Arg, Resolver, Query } from 'type-graphql'
import { createQueryBuilder } from 'typeorm'
import { Variety } from '../types'

@Resolver()
export class VarietiesResolver {
  @Query(() => [Variety])
  async basicTypes(
    @Arg('name', { nullable: true }) name: string
    //   @Arg('isFlower', { nullable: true }) isFlower: boolean,
    //   @Arg('isFruit', { nullable: true }) isFruit: boolean,
    //   @Arg('isHerb', { nullable: true }) isHerb: boolean,
    //   @Arg('isVegetable', { nullable: true }) isVegetable: boolean
  ) {
    try {
      let query = createQueryBuilder('variety')
        .select('basicType')
        .distinct(true)

      if (name)
        query = query.where('variety.basicType like :name', {
          name: `%${name}%`,
        })
      const basicTypes = await query.getRawMany()
      return basicTypes
    } catch (err) {
      throw new ApolloError(err.message)
    }
  }
}
