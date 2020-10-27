import { Field, ID, ObjectType, Root } from 'type-graphql'
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import { User } from './User'

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
  @Column({ default: false })
  isActive: boolean

  //owner
  @Field()
  @Column()
  ownerId: number

  //@Field()
  @ManyToOne(() => User, (user) => user.gardens)
  owner: User

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
