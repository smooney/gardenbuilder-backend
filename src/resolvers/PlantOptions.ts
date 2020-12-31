/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { errorResponse } from '../utils'
import { Resolver, Query } from 'type-graphql'
import { PlantOption } from '../entities'
import { PlantOptionsResponse } from '../types'

@Resolver()
export class PlantOptionsResolver {
  @Query(() => PlantOptionsResponse)
  async plantOptions() {
    try {
      const plantOptions = await PlantOption.find()
      return { plantOptions }
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
