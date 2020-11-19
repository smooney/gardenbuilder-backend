import { Field, ID, Int, ObjectType } from 'type-graphql'
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import { Garden } from './Garden'

@ObjectType()
@Entity()
export class Bed extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  name: string

  @Field()
  @UpdateDateColumn()
  endedAt: Date

  @Field()
  @Column({ default: true })
  isActive: boolean

  @Field(() => Int)
  @Column()
  gardenId: number

  @Field(() => Garden)
  @ManyToOne(() => Garden, (garden) => garden.beds, { onDelete: 'CASCADE' })
  garden: Garden

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
