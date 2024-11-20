import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { CustomGroup } from "./customGroup.entity";
import { Genre } from "./genre.entity";
import { LectureGroup } from "./lecturegroup.entity";

@Entity()
export class Lecture {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToMany(() => User, user => user.learningLectures)
  user: User[]

  @Column()
  name: string

  @Column()
  openTime: Date

  @Column()
  closeTime: Date

  @Column({ default: false })
  status?: boolean

  @Column({ default: 0, nullable: true })
  minimum: number

  @Column({ default: 1000, nullable: true })
  capacity: number

  @Column({ default: 0 })
  length: number

  @Column({ default: 0 })
  registerations: number

  @Column()
  lectureTime: Date

  @Column({ nullable: true })
  location: string

  @Column()
  price: number

  @Column({ nullable: true })
  difficulty: number

  @Column({ nullable: true })
  description?: string

  @Column({ nullable: true })
  music?: string

  @Column()
  contact: string

  @Column()
  remaining: number

  @BeforeInsert()
  @BeforeUpdate()
  calculateRemaining(){
    this.remaining = this.capacity - this.registerations
  }

  @ManyToMany(() => Genre, genre => genre.lectures, { cascade: true })
  @JoinTable()
  genres: Genre[];

  @ManyToMany(() => User, user => user.teachingLectures)
  instructor: User[];

  @ManyToMany(() => CustomGroup, customGroup => customGroup.lectures)
  @JoinTable()
  customGroups: CustomGroup[]

  @ManyToOne(() => LectureGroup, (lectureGroup) => lectureGroup.lectures, { nullable: true })
  lectureGroup: LectureGroup | null
}