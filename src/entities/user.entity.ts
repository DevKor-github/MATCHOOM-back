import { Column, PrimaryGeneratedColumn, ManyToMany, Entity, OneToMany, Unique, CreateDateColumn, JoinTable } from 'typeorm';
import { Follow } from './follow.entity';
import { Tokens } from './token.entity';
import { Lecture } from './lecture.entity';
import { CustomGroup } from './customGroup.entity';

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

  @OneToMany(() => Review)
  reviews: Review[];

  @OneToOne(() => Certification)
  certification: Certification;
  
  */
  @ManyToMany(() => CustomGroup, customGroup => customGroup.users, {nullable: true, cascade: true})
  @JoinTable()
  customGroups: CustomGroup[];

  @ManyToMany(() => Lecture, lecture => lecture.user, { nullable: true })
  @JoinTable()
  learningLectures: Lecture[];

  @ManyToMany(() => Lecture, lecture => lecture.user, { nullable: true })
  @JoinTable()
  teachingLectures: Lecture[];

  @ManyToMany(() => Follow, follow => follow.user, { nullable: true, cascade: true })
  follows: Follow[];

  @OneToMany(() => Tokens, token => token.user, { nullable: true })
  tokens: Tokens[];

}
