import { CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  followedAt: Date;

  @ManyToMany(() => User, user => user.follows)
  user: User;
}