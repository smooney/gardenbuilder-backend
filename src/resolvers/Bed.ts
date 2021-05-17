/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ApolloError } from 'apollo-server'
import {
  Arg,
  Resolver,
  Query,
  Mutation,
  Int,
  InputType,
  Field,
} from 'type-graphql'
import { Bed } from '../entities/Bed'
import { Garden } from '../entities/Garden'

@InputType()
class UpdateBedDimensionsInput implements Partial<Bed> {
  @Field()
  id: number

  @Field(() => Int, { nullable: true })
  length?: number

  @Field(() => Int, { nullable: true })
  width?: number

  @Field({ nullable: true })
  unitOfMeasurement?: string
}

@Resolver()
export class BedResolver {
  @Query(() => Bed)
  async bed(@Arg('id', () => Int) id: number) {
    return await Bed.findOne(id)
  }

  @Query(() => [Bed], { nullable: true })
  async beds(@Arg('gardenId', () => Int) gardenId: number) {
    const garden: Garden | undefined = await Garden.findOne({
      where: { id: gardenId },
    })
    const beds = Bed.find({ where: { gardenId: garden?.id } })
    return beds
  }

  @Mutation(() => Bed)
  async createBed(
    @Arg('gardenId', () => Int) gardenId: number,
    @Arg('name', () => String) name: string,
    @Arg('length', () => Int) length: number,
    @Arg('width', () => Int) width: number,
    @Arg('unitOfMeasurement', () => String) unitOfMeasurement: string

    // @Ctx() { req }: Context
  ) {
    // TODO: Validate that garden belongs to owner
    // const ownerId = getUserIdFromRequest(req) as number
    //  const owner = await User.findOne({ id: ownerId })
    try {
      const garden = await Garden.findOne({ id: gardenId })
      const bed = Bed.create({
        gardenId,
        garden,
        name,
        length,
        width,
        unitOfMeasurement,
      })
      return await bed.save()
    } catch (err) {
      throw new ApolloError(err.message)
    }
  }

  @Mutation(() => Bed)
  async updateBedDimensions(
    // @Ctx() { req }: Context,
    @Arg('input') input: UpdateBedDimensionsInput
  ) {
    const bed = await Bed.findOne({ id: input.id })

    // TODO: validate bed belongs to user
    // const ownerId = getUserIdFromRequest(req) as number
    // const garden = await Garden.findOne({ id: bed?.gardenId })
    // if (ownerId !== garden?.ownerId) {
    //   throw new ApolloError('Bed does not belong to this user')
    // }
    if (input.length && bed) {
      bed.length = input.length
    }
    if (input.width && bed) {
      bed.width = input.width
    }
    if (input.unitOfMeasurement && bed) {
      bed.unitOfMeasurement = input.unitOfMeasurement
    }

    return await bed?.save()
  }
}
