import { Column, Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Lecture{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToMany(() => User, user => user.learningLectures)
    user: User[]

    @Column()
    name: string

    @Column()
    openTime: Date

    @Column()
    closeTime: Date

    @Column({default: false})
    status?: boolean    

    @Column({default: -1})
    capacity: number

    @Column({default: 0})
    length: number

    @Column({default: 0})
    registerations: number

    @Column()
    lectureTime: Date

    @Column({nullable: true})
    location: string

    @Column()
    price: number

    @Column({nullable: true})
    difficulty: number

    @Column({nullable: true})
    description?: string

    @Column({nullable: true})
    music?: string

    @Column()
    contact: string

    //@ManyToMany(() => Genre, genre => genre.lectures)
    //genres: Genre[]

    @ManyToMany(() => User, user => user.teachingLectures)
    instructor: User[];

}