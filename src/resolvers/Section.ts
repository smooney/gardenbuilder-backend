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

  @Query(() => SectionsResponse)
  async sections(@Arg('bedId', () => Int) bedId: number) {
    try {
      const sections = Section.find({ where: { bedId } })
      return { sections }
    } catch (err) {
      return errorResponse(err.message)
    }
  }
  // @Mutation(() => BedResponse)
  // async createBed(
  //   @Arg('gardenId', () => Int) gardenId: number,
  //   @Arg('name', () => String, { nullable: true }) name: string
  //   // @Ctx() { req }: Context
  // ) {
  //   // TODO: Validate that garden belongs to owner
  //   // const ownerId = getUserIdFromRequest(req) as number
  //   //  const owner = await User.findOne({ id: ownerId })
  //   try {
  //     const garden = await Garden.findOne({ id: gardenId })
  //     const bed = Bed.create({
  //       gardenId,
  //       garden,
  //       name,
  //     })
  //     await bed.save()
  //     return { bed }
  //   } catch (err) {
  //     return errorResponse(err.message)
  //   }
  // }
}
