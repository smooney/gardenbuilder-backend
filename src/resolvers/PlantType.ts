/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Resolver, Query, Mutation, Arg, Int } from 'type-graphql'
import { Bed, Garden, Section } from '../entities'
import { errorResponse } from '../utils'
import { SectionResponse, SectionsResponse } from '../types'

@Resolver()
export class SectionResolver {
  @Query(() => SectionResponse)
  async section(@Arg('id', () => Int) id: number) {
    const section = await Section.findOne(id)
    if (!section) {
      return errorResponse('Section not found')
    }
    return { section }
  }
}
