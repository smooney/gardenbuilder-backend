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
  @Column('boolean', { default: false, nullable: true })
  frostResistant: boolean

  @Field(() => Boolean)
  @Column('boolean', { default: false, nullable: true })
  heatResistant: boolean

  @Field(() => Boolean)
  @Column('boolean', { default: false, nullable: true })
  isFlower: boolean

  @Field(() => Boolean)
  @Column('boolean', { default: false, nullable: true })
  isFruit: boolean

  @Field(() => Boolean)
  @Column('boolean', { default: false, nullable: true })
  isHerb: boolean

  @Field(() => Boolean)
  @Column('boolean', { default: false, nullable: true })
  isVegetable: boolean

  @Field(() => Boolean)
  @Column('boolean', { default: false, nullable: true })
  isCommon: boolean
}
