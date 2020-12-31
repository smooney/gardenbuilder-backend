import { Field, ID, ObjectType } from 'type-graphql'
import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

@ObjectType()
@Entity()
export class Variety extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id: number

  @Field(() => String)
  @Column()
  commonName: string

  @Field(() => String)
  @Column()
  slug: string

  @Field(() => String)
  @Column()
  scientificName: string

  @Field(() => String)
  @Column()
  imageUrl: string

  @Field(() => String)
  @Column()
  genus: string

  @Field(() => String)
  @Column()
  family: string

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
