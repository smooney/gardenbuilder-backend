import { Field, ID, Int, ObjectType } from 'type-graphql'
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { Bed } from './Bed'

@ObjectType()
@Entity()
export class Section extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => Int)
  @Column()
  xPosition!: number

  @Field(() => Int)
  @Column()
  yPosition!: number

  @Field(() => Int)
  @Column()
  bedId: number

  // cascade means that a new user will be created if passed to user
  @Field(() => Bed)
  @ManyToOne(() => Bed, (bed) => bed.sections, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  bed: Bed

  @Field(() => String)
  @Column()
  plantType: string

  // TODO: Add Plant
  // @OneToMany(() => Plant, (bed) => bed.garden)
  // beds: Bed[]

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
