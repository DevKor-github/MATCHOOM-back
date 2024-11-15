import { CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  followedAt: Date;

  @ManyToOne(() => User, (user) => user.following, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: 'followerId' })
  follower: User;

  @ManyToOne(() => User, (user) => user.followers, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: 'followingId' })
  following: User;
}