/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { errorResponse } from '../utils'
import { Resolver, Query } from 'type-graphql'
import { PlantOption } from '../entities'
// import { errorResponse } from '../utils'
import { PlantOptionsResponse } from '../types'
// import { getPlantTypes } from '../utils/queryTrefle'

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
}
