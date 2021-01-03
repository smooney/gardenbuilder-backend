/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { errorResponse } from '../utils'
import { Arg, Resolver, Query } from 'type-graphql'
import { Variety, VarietiesResponse } from '../types'
import { insertVarietiesIntoDatabase, getVarieties } from '../utils/queryTrefle'

@Resolver()
export class VarietiesResolver {
  @Query(() => VarietiesResponse)
  async varieties(@Arg('species', () => String) species: string) {
    try {
      const varieties: Variety[] = await getVarieties(species)
      // TODO: Insert varieties into database
      insertVarietiesIntoDatabase(varieties)

      return { varieties }
    } catch (err) {
      return errorResponse(err.message)
    }
  }
}
