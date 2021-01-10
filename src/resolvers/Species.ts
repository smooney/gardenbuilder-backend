/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { errorResponse } from '../utils'
import { Resolver, Query } from 'type-graphql'
import { Species } from '../entities'
import { SpeciesResponse } from '../types'

@Resolver()
export class SpeciesResolver {
  @Query(() => SpeciesResponse)
  async plantOptions() {
    try {
      const species = await Species.find()
      return { species }
    } catch (err) {
      return errorResponse(err.message)
    }
  }

  // @Query(() => VarietiesResponse)
  // async varieties(@Arg('species', () => String) species: string) {
  //   try {
  //     const varieties = await getVarieties(species)
  //     return { varieties }
  //   } catch (err) {
  //     return errorResponse(err.message)
  //   }
  // }
}
