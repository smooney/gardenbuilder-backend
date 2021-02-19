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
import { User } from './User'
import { Bed } from './Bed'

@ObjectType()
@Entity()
export class Garden extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  name!: string

  @Field()
  @UpdateDateColumn()
  endedAt: Date

  @Field()
  @Column({ default: true })
  isActive: boolean

  @Field(() => Int)
  @Column()
  ownerId: number

  // cascade means that a new user will be created if passed to user
  @Field(() => User)
  @ManyToOne(() => User, (owner) => owner.gardens, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  owner: User

  @Field(() => [Bed])
  @OneToMany(() => Bed, (bed) => bed.garden, { eager: true })
  beds: Bed[]

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
