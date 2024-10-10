import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { LectureCreateDto } from './dtos/lectureCreate.dto';
import { LectureApplyDto, LectureReadDto } from './dtos/lectureRead.dto'
import { Repository } from 'typeorm';
import { Lecture } from 'src/entities/lecture.entity';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LectureGroupCreateDto, LectureGroupDeleteDto, LectureGroupUpdateDto } from './dtos/lecturegroup.dto';
import { CustomGroup } from 'src/entities/customGroup.entity';
import { LectureDeleteDto, LectureUpdateDto } from './dtos/lectureUpdate.dto';

@Injectable()
export class LectureService {
    constructor(
        @InjectRepository(Lecture)
        private lectureRepository: Repository<Lecture>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(CustomGroup)
        private customGroupRepository: Repository<CustomGroup>
    ){}

    async lectureUpdate(lectureUpdateDto: LectureUpdateDto, userId: number): Promise<object>{
        const lec = await this.lectureRepository.findOne({where: {id: lectureUpdateDto.lectureId}})
        if(this.lectureOwnerCheck(lectureUpdateDto.lectureId, userId))throw new ForbiddenException("소유하지 않은 강의")

        const toUpdate = {}

        for(const key in lectureUpdateDto){
            if(lectureUpdateDto[key] !== undefined && lectureUpdateDto[key] !== null)
                toUpdate[key] = lectureUpdateDto[key]
        }
        try{
            await this.lectureRepository.update(lec, toUpdate)
        }catch(err){
            throw new InternalServerErrorException(err)
        }
        return {message: "성공"} 
    }

    async lectureDelete(lectureDeleteDto: LectureDeleteDto, userId: number): Promise<object>{ 
        if(this.lectureOwnerCheck(lectureDeleteDto.lectureId, userId))throw new ForbiddenException("소유하지 않은 강의")
        const lec = await this.lectureRepository.findOne({where:{id: lectureDeleteDto.lectureId}})
        return this.lectureRepository.delete(lec)
    }

    async lectureOwnerCheck(lectureId: number, userId: number): Promise<boolean>{
        const lec = await this.lectureRepository.findOne({
            where: {id: lectureId},
            relations: ['instructor']
        })
        if(!lec) new NotFoundException("해당하는 강의를 찾을 수 없습니다.")
        return lec.instructor.some(e => e.id === userId)
    }

    async lectureCreate(lectureCreateDto: LectureCreateDto, userId: number): Promise<object>{
        const {
            instructorId, name, capacity, lectureTime, openTime, closeTime, location, price, description, music, contact, difficulty
        } = lectureCreateDto
        const creatingUser = await this.userRepository.findOne({where: {id: userId}})
        const instructors = JSON.parse(instructorId)
        const instructor = await Promise.all(
            instructors.map(async(e: string) =>{
            try{
                const user = await this.userRepository.findOne({where: {userId: e}})
                return user? user : null
            }catch(err){
                console.log(err)
            }
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
        //리팩토링 예정
        //if(contact === null) userId => userRepository
        //if(music !== null) this.etcService.getPlaylist(music)

        return await this.lectureRepository.save(res)
    }

    async lectureApply(lectureApplyDto: LectureApplyDto, userId: number): Promise<object>{
        const lec = await this.lectureRepository.findOne({where:{id: lectureApplyDto.lectureId}, relations: ['user']})
        const usr = await this.userRepository.findOne({where: {id: userId}})
        if((lec.capacity > lec.registerations) && 
            lec.user.find((e) => e.id === userId) === undefined
        ){
            lec.registerations++
            lec.user.push(usr)
            await this.lectureRepository.save(lec)
            usr.learningLectures.push(lec)
            await this.userRepository.save(usr)
        }
        else throw new ForbiddenException("정원 초과 또는 이미 강의에 포함되어있음")
        return {message: "성공 " + lec.registerations +"/"+ lec.capacity}
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

        const res = [...student_res, ...create_res].sort((a, b) =>
            new Date(a.lecturetime).getTime() - new Date(b.lecturetime).getTime()
        )

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

    async onUserCustomGroup(userId: number): Promise<object>{
        const usr = await this.userRepository.findOne({where: {id: userId}})
        const customGroups = usr.customGroup
        const res = customGroups
        .map((e) => ({
            id: e.id,
            name: e.name,
            lectures: e.lectures
        })
        )
        return res
    }
    async createUserCustomGroup(lectureGroupCreateDto: LectureGroupCreateDto, userId: number){
        const user = await this.userRepository.findOne({where: {id: userId}})
        //user가 그 강의를 수강중인지 validation 추가 or 수강중인것만 options?
        const lectures = []
        for(const i of lectureGroupCreateDto.lectures){
            const lec = await this.lectureRepository.findOne({where: {id: i}})
            if(!lec) throw new NotFoundException("해당하는 강의를 찾을 수 없습니다.")
            lectures.push(lec)  
        }
        const newgroup = await this.customGroupRepository.create({
            name: lectureGroupCreateDto.name,
            users: [user],
            lectures: lectures
        })

        user.customGroup.push(newgroup)
        await this.userRepository.save(user)

        return this.customGroupRepository.save(newgroup)
    }
    async updateUserCustomGroup(lectureGroupUpdateDto: LectureGroupUpdateDto, userId: number){
        const group = await this.customGroupRepository.findOne({where: {id: lectureGroupUpdateDto.id}})
        if(!this.groupOwnerCheck(lectureGroupUpdateDto.id, userId)) throw new ForbiddenException("소유하지 않은 그룹입니다.")
            
        const lectures = lectureGroupUpdateDto.lectures || undefined
        const name = lectureGroupUpdateDto.name || undefined

        if(lectures === undefined && name === undefined) return {message: "바뀐게 없습니다"}
        //update
    }
    async deleteUserCustomGroup(lectureGroupDeleteDto: LectureGroupDeleteDto, userId: number){
        if(!this.groupOwnerCheck(lectureGroupDeleteDto.id, userId)) throw new ForbiddenException("소유하지 않은 그룹입니다.")
        const group = await this.customGroupRepository.findOne({where: {id: lectureGroupDeleteDto.id}})
        return await this.customGroupRepository.delete(group)
    }

    async groupOwnerCheck(groupId: number, userId: number){
        const group = await this.customGroupRepository.findOne({where: {id: groupId}})
        const res = group.users.find((e) => e.id === userId) === undefined 
        return res
    }

    /* async writeReview(){}
    async modifyReview(){}
    async getReview(){}
    async deleteReview(){}*/
}
