import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LectureCreateDto } from './dtos/lectureCreate.dto';
import { LectureApplyDto, LectureReadDto } from './dtos/lectureRead.dto'
import { Repository } from 'typeorm';
import { Lecture } from 'src/entities/lecture.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class LectureService {
    constructor(
        private readonly authService: AuthService,
        private lectureRepository: Repository<Lecture>,
        private userRepository: Repository<User>
    ){}

    async lectureCreate(lectureCreateDto: LectureCreateDto, userId: number): Promise<object>{
        const {
            instructorId, name, capacity, lectureTime, openTime, closeTime, location, price, description, music, contact, difficulty
        } = lectureCreateDto
        const creatingUser = await this.userRepository.findOne({where: {id: userId}})
        const instructors = JSON.parse(instructorId)
        const instructor = await Promise.all(
            instructors.map(async(e) =>{
                const user = await this.userRepository.findOne({where: {userId:e}})
                return user? user : null
            })
        )

        const res = this.lectureRepository.create({
            instructor: [...instructor, creatingUser],
            name,
            openTime,
            closeTime,
            status: false,
            capacity: capacity || undefined,
            lectureTime,
            location: location || undefined,
            price,
            difficulty: difficulty || undefined,
            description: description || undefined,
            music: music || undefined,
            contact
        })
        //if(contact === null) sub.userId => userRepository
        //if(music !== null) this.crawelerService.getPlaylist(music)

        return res
    }

    async lectureApply(lectureApplyDto: LectureApplyDto, userId: number): Promise<object>{
        const lec = await this.lectureRepository.findOne({where:{id: lectureApplyDto.lectureId}})
        if(lec.capacity > lec.registerations && 
            lec.user.find((e) => e.id === userId) === undefined
        ){
            lec.registerations++
            await this.lectureRepository.save(lec)
        }
        else throw new ForbiddenException("정원 초과 또는 이미 강의에 포함되어있음")
        return {message: "성공" + lec.registerations +"/"+ lec.capacity}
    }

    async getUserStudOwnLectures(userId: number){
        return (await this.userRepository.findOne({where:{id: userId}})).learningLectures
    }

    async getUserCreateOwnLectures(userId: number){
        return (await this.userRepository.findOne({where: {id: userId}})).teachingLectures
    }

    async getInitialScreen(userId: number): Promise<object>{
        const student_res = (await this.getUserStudOwnLectures(userId))
        .filter((e) => new Date(e.lectureTime).getTime() + e.length*60*1000 > new Date().getTime())
        .map((e) =>({
            name: e.name,
            lecturetime: e.lectureTime,
            length: e.length,
            price: e.price,
            type: 0
        }))

        const create_res = (await this.getUserCreateOwnLectures(userId))
        .filter((e) => new Date(e.lectureTime).getTime() + e.length*60*1000 > new Date().getTime())
        .map((e) =>({
            name: e.name,
            lecturetime: e.lectureTime,
            length: e.length,
            price: e.price,
            type: 1
        }))

        const res = {...student_res, ...create_res} //sort as lectureTime Timestamp

        return res
    }

    async getLectureInformation(lectureReadDto: LectureReadDto): Promise<object>{
        const res = await this.lectureRepository.findOne({where: {id: lectureReadDto.lectureId}})
        return res
    }

    async getLectureAbstract(lectureId: number): Promise<object>{
        const res = await this.lectureRepository.findOne({where: {id: lectureId}})
        return {
            name: res.name,
            lecturetime: res.lectureTime,
            length: res.length
        }
    }

    async onUserCustomGroup(userId: number){}
    async createUserCustomGroup(){}
    async updateUserCustomGroup(){}
    async deleteUserCustomGroup(){}
    //userId -> All lectures -> Abstract는 다 던져주기

    /* async writeReview(){}
    async modifyReview(){}
    async getReview(){}
    async deleteReview(){}*/

    /* if(lectureReadDto.accessType === 1){
            const res = await this.userRepository.findOne({where: {}})
        }
        else if(lectureReadDto.accessType === 2){}
        else
    */
}
