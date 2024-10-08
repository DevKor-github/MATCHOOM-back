import { Column, PrimaryGeneratedColumn, ManyToMany, Entity, OneToMany, Unique, CreateDateColumn } from 'typeorm';
import { Follow } from './follow.entity';
import { Tokens } from './token.entity';

@Entity()
@Unique(['userId'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 20 })
  nickname: string;

  @Column({ type: 'date', nullable: true })
  birthday: Date;

  @Column({ type: 'varchar', length: 6, nullable: true })
  gender: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ nullable: true })
  level: number;

  @Column({ nullable: true })
  address: string;

  @Column({ default: false })
  blueCheck: boolean;

  @CreateDateColumn()
  createdAt: Date;

  /*
  @ManyToMany(() => Genre, genre => genre.user, { nullable: true })
  genres: Genre[];

  @ManyToMany(() => Lecture, lecture => lecture.user, { nullable: true })
  learningLectures: Lecture[];

  @ManyToMany(() => Lecture, lecture => lecture.user, { nullable: true })
  teachingLectures: Lecture[];

  @OneToMany(() => Review)
  reviews: Review[];

  @OneToOne(() => Certification)
  certification: Certification;
  
  */

  @OneToMany(() => Follow, follow => follow.user, { nullable: true })
  follows: Follow[];

  @OneToMany(() => Tokens, token => token.user, { nullable: true })
  tokens: Tokens[];

}
