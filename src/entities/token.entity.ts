import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('tokens')
export class Tokens {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.tokens)
  user: User;

  @Column()
  refreshToken: string;

  @Column()
  expiresAt: Date;
}