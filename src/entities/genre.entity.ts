import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Lecture } from "./lecture.entity";

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, user => user.genres)
  users: User[];

  @ManyToMany(() => Lecture, lecture => lecture.genres)
  lectures: Lecture[];
}