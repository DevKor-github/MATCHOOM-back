import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LectureCreateDto } from './dtos/lectureCreate.dto';
import { LectureService } from './lecture.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('lecture')
export class LectureController {
    constructor(
        private readonly lectureService: LectureService,
    ){}

    @Post('createLecture')
    @UseGuards(AuthGuard('jwt-access'))
    async createLecture(
        @Body() lectureCreateDto: LectureCreateDto,
        @Req() req: any
    ): Promise<object>{
        const userId = req.user.id
        return await this.lectureService.lectureCreate(lectureCreateDto, userId)
    }

    @Get('home')
    @UseGuards(AuthGuard('jwt-access'))
    async getHome(

    ): Promise<object>{
        return
    }

    @Get('search')
    async lectureSearch(){}

    @Get('groupInfo')
    async getGroupInfo(){}
    
    @Post('createOwnGroup')

    @Get('lectureInfo')
    async getLectureInfo(){}

}
