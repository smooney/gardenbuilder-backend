import { Field, ID, ObjectType } from 'type-graphql'
import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@ObjectType()
@Entity()
export class PlantVariety extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => String)
  @Column({ nullable: true })
  speciesId: string

  @Field(() => String)
  @Column({ nullable: true })
  variety: string

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
