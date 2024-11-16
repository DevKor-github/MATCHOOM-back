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

  async getCurationLecture() {}

  async getHotLecture(): Promise<Partial<Lecture>> {
    const fields = ['id', 'name', 'description'];
    const orderBy: { field: string; direction: 'ASC' | 'DESC' } = { field: 'registerations', direction: 'DESC' }; 
    const limit = 10;
    const offset = 0;

    const result = await this.findLectures(fields, 1, orderBy, undefined, limit, offset);

    return result;
  }
  
  async getUpcomingDeadlineLecture(): Promise<Partial<Lecture>> {
    const fields = ['id', 'name', 'description', 'closeTime'];
    const orderBy: { field: string; direction: 'ASC' | 'DESC' } = { field: 'closeTime', direction: 'ASC' }; 
    const limit = 10;
    const offset = 0;

    const result = await this.findLectures(fields, 1, orderBy, undefined, limit, offset);

    return result;
  }

  async getRecommendLecture(userId: number) {
    
  }

  async getSearchResult(keyword: string) {
    const res = [];
    const onSearchLecture = await this.findLectures(['id', 'name', 'description'], 1, undefined, keyword, undefined, undefined);
    const onSearchUser = await this.findUsers(['nickname', 'description'], null, keyword, undefined, undefined);
    res.push(
      ...onSearchLecture.map(lec => ({type: 'lecture', 
        data: {
        id: lec.id,
        name: lec.name,
        description: lec.description
        }
    })),
      ...onSearchUser.map(user => ({type: 'user', 
        data: {
          name: user.nickname,
          description: user.description
      }
    }))
    )

    return res
  }

  async findAll(): Promise<Partial<Lecture>[]> {
    const fields = ['id', 'name', 'description'];
    const orderBy: { field: string; direction: 'ASC' | 'DESC' } = { field: 'registerations', direction: 'DESC' };

    const result = await this.findLectures(fields, 1, orderBy, undefined, undefined, undefined);

    return result;
  }

  async findLectureByName(keyword: string) {
    const fields = ['id', 'name', 'description'];
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
  ): Promise<Partial<Lecture>[]> {
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

  async findUsers(
    fields: string[],
    orderBy?: { field: string, direction: 'ASC' | 'DESC' },
    keyword?: string,
    limit?: number,
    offset?: number
  ): Promise<Partial<User>[]> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .select(fields.map(field => `user.${field}`));
  
    const conditions: string[] = [];
    const parameters: any = {};
  
    if (keyword) {
      conditions.push('user.nickname LIKE :keyword');
      parameters.keyword = `%${keyword}%`;
    }
    if (conditions.length > 0) {
      queryBuilder.where(conditions.join(' AND '), parameters);
    }  
    if (orderBy) {
      queryBuilder.orderBy(`user.${orderBy.field}`, orderBy.direction);
    }
    if (limit) queryBuilder.take(limit);
    if (offset) queryBuilder.skip(offset);
  
    return await queryBuilder.getMany();
  }

  async onSearch(keyword: string, id: number){
    //Autocomplete
  } //Logger id 
}
