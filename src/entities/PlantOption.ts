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
  commonName: string

  @Field(() => String)
  @Column({ nullable: true })
  otherCommonName: string

  @Field(() => Boolean)
  @Column()
  isVegetable: boolean

  @Field(() => Boolean)
  @Column()
  isHerb: boolean

  @Field(() => Boolean)
  @Column()
  isFruit: boolean

  @Field(() => Boolean)
  @Column()
  isCommon: boolean

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
