import { Column, PrimaryGeneratedColumn, ManyToMany, Entity, OneToMany } from 'typeorm';
import { Follow } from './follow.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column()
  birthday: Date;

  @Column()
  gender: string;

  @Column()
  description: string;

  @Column()
  level: number;

  @Column()
  address: string;

  @Column()
  blueCheck: boolean;

  
  /*
  @ManyToMany(() => Genre)
  genres: Genre[];

  @ManyToMany(() => Lecture)
  learningLectures: Lecture[];

  @ManyToMany(() => Lecture)
  teachingLectures: Lecture[];

  @OneToMany(() => Review)
  reviews: Review[];

  @OneToOne(() => Certification)
  certification: Certification;
  
  */

  @OneToMany(() => Follow, follow => follow.user)
  follows: Follow[];


}
