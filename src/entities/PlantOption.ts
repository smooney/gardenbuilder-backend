import { Field, ID, ObjectType } from 'type-graphql'
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@ObjectType()
@Entity()
export class PlantOption extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @Column()
  common_name: string

  @Field(() => String)
  @Column({ nullable: true })
  other_common_name: string

  @Field(() => String)
  @Column()
  type: string

  @Field(() => Boolean)
  @Column()
  is_vegetable: boolean

  @Field(() => Boolean)
  @Column()
  is_herb: boolean

  @Field(() => Boolean)
  @Column()
  is_fruit: boolean

  @Field(() => Boolean)
  @Column()
  is_common: boolean

  // TODO: Add VarietyOption and link
  // @OneToMany(() => Plant, (bed) => bed.garden)
  // beds: Bed[]

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
