import { Injectable } from '@nestjs/common';
import { SearchDto } from './dtos/search.dto';

@Injectable()
export class SearchService {
    constructor(

    ){}

    async search(searchDto: SearchDto, userId?: number): Promise<object>{
        const byUser = this.searchByUser(searchDto)
        const byLecture = this.searchByLecture(searchDto)
        const res = {byUser, byLecture}
        return
    }
    //async onSearch(){}

    async searchByUser(searchDto: SearchDto){

        //Sort
    }
    async searchByLecture(searchDto : SearchDto){

        //뱉으면 된다.
    }
}
