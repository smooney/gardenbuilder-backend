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
import { Garden } from './Garden'
import { Section } from './Section'

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
  @Column()
  length: number

  @Field()
  @Column()
  width: number

  @Field()
  @Column()
  unitOfMeasurement: string

  @Field()
  @UpdateDateColumn()
  endedAt: Date

  @Field()
  @Column({ default: true })
  isActive: boolean

  @Field(() => Int)
  @Column()
  gardenId: number

  // Cascade here means that if there is a Garden passed to bed,
  // a new garden will be inserted
  @Field(() => Garden)
  @ManyToOne(() => Garden, (garden) => garden.beds, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  garden: Garden

  @OneToMany(() => Section, (section) => section.bed)
  sections: Section[]

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
