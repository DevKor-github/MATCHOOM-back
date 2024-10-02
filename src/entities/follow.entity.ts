import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  followedAt: Date;

  @ManyToOne(() => User, user => user.follows, { onDelete: "CASCADE" })
  user: User;
}