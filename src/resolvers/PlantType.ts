/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Resolver, Query, Arg, Int } from 'type-graphql'
import { Section } from '../entities'
import { errorResponse } from '../utils'
import { SectionResponse } from '../types'

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
