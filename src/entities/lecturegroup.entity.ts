import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Lecture } from './lecture.entity';

@Entity()
export class LectureGroup {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToOne(() => Lecture, { nullable: false })
  primaryLecture: Lecture

  @OneToMany(() => Lecture, (lecture) => lecture.lectureGroup)
  lectures: Lecture[]
}