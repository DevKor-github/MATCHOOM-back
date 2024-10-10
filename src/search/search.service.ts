import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lecture } from 'src/entities/lecture.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Lecture)
    private lectureRepository: Repository<Lecture>
  ) { }

  /*
  async search(searchDto: SearchDto, userId?: number): Promise<object> {
    const byUser = this.searchByUser(searchDto)
    const byLecture = this.searchByLecture(searchDto)
    const res = { byUser, byLecture }
    return
  }
    */

  async getCurationLecture() {

  }

  async getHotLecture(): Promise<Partial<Lecture>> {
    const fields = ['name', 'description'];
    const orderBy: { field: string; direction: 'ASC' | 'DESC' } = { field: 'registerations', direction: 'DESC' }; 
    const limit = 10;
    const offset = 0;

    const result = await this.findLectures(fields, 1, orderBy, undefined, limit, offset);

    return result;
  }
  
  async getUpcomingDeadlineLecture(): Promise<Partial<Lecture>> {
    const fields = ['name', 'description', 'closeTime'];
    const orderBy: { field: string; direction: 'ASC' | 'DESC' } = { field: 'closeTime', direction: 'ASC' }; 
    const limit = 10;
    const offset = 0;

    const result = await this.findLectures(fields, 1, orderBy, undefined, limit, offset);

    return result;
  }

  async getRecommendLecture(userId: number) {
    
  }

  async getSearchResult(keyword: string) {
    const result = [];
    const searchLecture = await this.findLectureByName(keyword);

    if (searchLecture) result.push(searchLecture);

    return result;
  }

  async findUserByName(keyword: string) {
    // join table 생성 후 구현 예정
  }

  async findLectureByName(keyword: string) {
    const fields = ['name', 'description'];
    const orderBy: { field: string; direction: 'ASC' | 'DESC' } = { field: 'registerations', direction: 'DESC' }; 
    const limit = 10;
    const offset = 0;

    const result = await this.findLectures(fields, 1, orderBy, keyword, limit, offset);

    return result;
  }

  async findLectures(
    fields: string[],
    isCurrent: number,
    orderBy?: { field: string, direction: 'ASC' | 'DESC' },
    keyword?: string,
    limit?: number,
    offset?: number
  ): Promise<Partial<Lecture>> {
    const queryBuilder = this.lectureRepository
    .createQueryBuilder('lecture')
    .select(fields.map(field => `lecture.${field}`));

    const conditions: string[] = [];
    const parameters: any = {};
    const currentTime: Date = new Date();

    if (orderBy) queryBuilder.orderBy(`lecture.${orderBy.field}`, orderBy.direction);
    if (limit) queryBuilder.take(limit);
    if (offset) queryBuilder.skip(offset);
    if (keyword) {
      conditions.push('lecture.name LIKE :keyword');
      parameters.keyword = `%${keyword}%`;
    }
    if (isCurrent === 0) {
      conditions.push('lecture.closeTime <= :currentTime');
      parameters.currentTime = currentTime;
    }
    else if (isCurrent === 1) {
      conditions.push('lecture.closeTime > :currentTime');
      parameters.currentTime = currentTime;
    }

    if (conditions) queryBuilder.where(conditions.join(' AND '), parameters);
    
    return await queryBuilder.getMany();
  }

  async findUsers() {
    
  }

  //async onSearch(){}
}
