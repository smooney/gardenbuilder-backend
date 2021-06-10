/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Resolver, Query, Mutation, Arg, Int } from 'type-graphql'
import { Section } from '../entities'
import { SectionResponse, SectionsResponse } from '../types'
import { ApolloError } from 'apollo-server'

@Resolver()
export class SectionResolver {
  @Query(() => SectionResponse)
  async section(@Arg('id', () => Int) id: number) {
    const section = await Section.findOne(id)
    if (!section) {
      throw new ApolloError('We could not find a section with that id')
    }
    return { section }
  }

  @Query(() => SectionsResponse)
  async sections(@Arg('bedId', () => Int) bedId: number) {
    try {
      const sections = Section.find({ where: { bedId } })
      return { sections }
    } catch (err) {
      throw new ApolloError(err.message)
    }
  }

  @Mutation(() => SectionResponse)
  async createSection(
    @Arg('bedId', () => Int) bedId: number,
    @Arg('xPosition', () => Int) xPosition: number,
    @Arg('yPosition', () => Int) yPosition: number,
    @Arg('plantType', () => String, { nullable: true }) plantType: string
    // @Ctx() { req }: Context
  ) {
    // TODO: Validate that section belongs to owner
    // const ownerId = getUserIdFromRequest(req) as number
    //  const owner = await User.findOne({ id: ownerId })
    try {
      const section = Section.create({
        bedId,
        xPosition,
        yPosition,
        plantType,
      })
      await section.save()
      return { section }
    } catch (err) {
      throw new ApolloError(err.message)
    }
  }
}
