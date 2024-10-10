import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { LectureCreateDto } from './dtos/lectureCreate.dto';
import { LectureService } from './lecture.service';
import { AuthGuard } from '@nestjs/passport';
import { LectureGroupCreateDto, LectureGroupDeleteDto, LectureGroupUpdateDto } from './dtos/lecturegroup.dto';
import { User } from 'src/decorator/user.decorator';
import { LoginUserDto } from 'src/auth/dtos/loginuser.dto';
import { LectureDeleteDto, LectureUpdateDto } from './dtos/lectureUpdate.dto';
import { LectureApplyDto, LectureReadDto } from './dtos/lectureRead.dto';

@Controller('lecture')
export class LectureController {
    constructor(
        private readonly lectureService: LectureService,
    ){}

    @Post('lecture')
    @UseGuards(AuthGuard('jwt-access'))
    async createLecture(
        @Body() lectureCreateDto: LectureCreateDto,
        @User() user: LoginUserDto
    ): Promise<object>{
        return await this.lectureService.lectureCreate(lectureCreateDto, user.id)
    }

    @Patch('lecture')
    @UseGuards(AuthGuard('jwt-access'))
    async updateLecture(
        @Body() lectureUpdateDto: LectureUpdateDto,
        @User() user: LoginUserDto
    ): Promise<object>{
        return await this.lectureService.lectureUpdate(lectureUpdateDto, user.id)
    }

    @Delete('lecture')
    @UseGuards(AuthGuard('jwt-access'))
    async deleteLecture(
        @Body() lectureDeleteDto: LectureDeleteDto,
        @User() user: LoginUserDto
    ):Promise<object>{
        return await this.lectureService.lectureDelete(lectureDeleteDto, user.id)
    }

    @Get('customGroup')
    @UseGuards(AuthGuard('jwt-access'))
    async getGroupInfo(
        @User() user: LoginUserDto
    ): Promise<object>{
        return await this.lectureService.onUserCustomGroup(user.id)
    }
    
    @Post('customGroup')
    @UseGuards(AuthGuard('jwt-access'))
    async createCustomGroup(
        @Body() lectureGroupCreateDto: LectureGroupCreateDto,
        @User() user: LoginUserDto
    ): Promise<object>{
        return await this.lectureService.createUserCustomGroup(lectureGroupCreateDto, user.id)
    }

    @Patch('customGroup')
    @UseGuards(AuthGuard('jwt-access'))
    async patchCustomGroup(
        @Body() lectureGroupUpdateDto: LectureGroupUpdateDto,
        @User() user: LoginUserDto
    ): Promise<object>{
        return await this.lectureService.updateUserCustomGroup(lectureGroupUpdateDto, user.id)
    }

    @Delete('customGroup')
    @UseGuards(AuthGuard('jwt-access'))
    async deleteCustomGroup(
        @Body() lectureGroupDeleteDto: LectureGroupDeleteDto,
        @User() user: LoginUserDto
    ): Promise<object>{
        return await this.lectureService.updateUserCustomGroup(lectureGroupDeleteDto, user.id)
    }

    @Get('lectureAbstract')
    async getLectureAbstract(
        @Body('id') lectureId: number
    ):Promise<object>{
        return await this.lectureService.getLectureAbstract(lectureId)
    }

    @Post('lecture-apply')
    async applyToLecture(
        @Body() lectureApplyDto: LectureApplyDto,
        @User() user: LoginUserDto
    ):Promise<object>{
        return await this.lectureService.lectureApply(lectureApplyDto, user.id)
    }

    @Get('lectureinfo')
    async getLectureInfo(
        @Body() lectureReadDto: LectureReadDto
    ):Promise<object>{
        return await this.lectureService.getLectureInformation(lectureReadDto)
    }
}
