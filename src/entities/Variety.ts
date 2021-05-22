import { Field, ID, ObjectType } from 'type-graphql'
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

@ObjectType()
@Entity()
export class Variety extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @Column()
  basicType: string

  @Field(() => String)
  @Column()
  variety: string

  @Field(() => String)
  @Column({ nullable: true })
  instructionsFor: string

  @Field(() => String)
  @Column({ nullable: true })
  sproutsIn: string

  @Field(() => String)
  @Column({ nullable: true })
  idealTemp: string

  @Field(() => String)
  @Column({ nullable: true })
  seedDepth: string

  @Field(() => String)
  @Column({ nullable: true })
  spaceApart: string

  @Field(() => String)
  @Column({ nullable: true })
  minSun: string

  @Field(() => String)
  @Column({ nullable: true })
  growingTips: string

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  frostResistant: boolean

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  heatResistant: boolean

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  isFlower: boolean

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  isFruit: boolean

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  isHerb: boolean

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  isVegetable: boolean

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  isCommon: boolean
}
