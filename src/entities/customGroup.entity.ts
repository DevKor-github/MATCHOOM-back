import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Lecture } from "./lecture.entity";

@Entity()
export class CustomGroup {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany(() => User, user => user.customGroups)
  users: User[]

  @ManyToMany(() => Lecture, lecture => lecture.customGroups)
  lectures: Lecture[]
}