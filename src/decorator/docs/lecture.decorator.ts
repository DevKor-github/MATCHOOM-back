import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { LectureCreateDto } from 'src/lecture/dtos/lectureCreate.dto';
import { LectureApplyDto, LectureReadDto } from 'src/lecture/dtos/lectureRead.dto';
import { LectureDeleteDto, LectureUpdateDto } from 'src/lecture/dtos/lectureUpdate.dto';
import { LectureGroupCreateDto, LectureGroupUpdateDto, LectureGroupDeleteDto } from 'src/lecture/dtos/lecturegroup.dto';

type EndPoints =
  | 'act'
  | 'customGroup'
  | 'abstract'
  | 'apply'
  | 'info';

export function Docs(endPoint: EndPoints, method: 'POST' | 'GET' | 'PATCH' | 'DELETE') {
  switch (endPoint) {
    case 'act': 
      if (method === 'POST') return applyDecorators(
        ApiOperation({
          description: "새로운 강의 생성.  \nreturn 값 : 강의 내용 전체 \nDate와 관련된 모든것은 yyyy-mm-dd hh:mm 형식으로 전송.",
          summary: "강의 생성"
        }),
        ApiBody({ type: LectureCreateDto }),
        ApiCreatedResponse({ description: "생성 성공" })
      );
      if (method === 'PATCH') return applyDecorators(
        ApiOperation({
          description: "기존 강의 수정. \nreturn 값: 패치된 이후 강의 정보 전체",
          summary: "강의 수정"
        }),
        ApiBody({ type: LectureUpdateDto }),
        ApiCreatedResponse({ description: "수정 성공" })
      );
      if (method === 'DELETE') return applyDecorators(
        ApiOperation({
          description: "기존 강의 삭제.  \nreturn 값 : 성공 또는 실패에 따른 메시지",
          summary: "강의 삭제"
        }),
        ApiBody({ type: LectureDeleteDto }),
        ApiOkResponse({ description: "삭제 성공" })
      );
      break;
      
    case 'customGroup':
      if (method === 'POST') return applyDecorators(
        ApiOperation({
          description: "커스텀 그룹 생성",
          summary: "그룹 생성"
        }),
        ApiBody({ type: LectureGroupCreateDto }),
        ApiCreatedResponse({ description: "생성 성공" }),
        ApiBadRequestResponse({ description: "생성 실패" })
      );
      if (method === 'PATCH') return applyDecorators(
        ApiOperation({
          description: "그룹 정보 수정",
          summary: "그룹 수정"
        }),
        ApiBody({ type: LectureGroupUpdateDto }),
        ApiOkResponse({ description: "수정 성공" })
      );
      if (method === 'DELETE') return applyDecorators(
        ApiOperation({
          description: "그룹 정보 삭제",
          summary: "그룹 삭제"
        }),
        ApiBody({ type: LectureGroupDeleteDto }),
        ApiOkResponse({ description: "삭제 성공" })
      );
      if (method === 'GET') return applyDecorators(
        ApiOperation({
          description: "사용자 커스텀 그룹 정보 가져오기",
          summary: "그룹 정보 가져오기"
        }),
        ApiOkResponse({ description: "정보 가져오기 성공" })
      );
      break;

    case 'abstract':
      if (method === 'GET') return applyDecorators(
        ApiOperation({
          description: "강의 요약 정보 가져오기",
          summary: "강의 요약"
        }),
        ApiOkResponse({ description: "요약 정보 가져오기 성공" })
      );
      break;

    case 'apply':
      if (method === 'POST') return applyDecorators(
        ApiOperation({
          description: "강의에 참여",
          summary: "강의 참여"
        }),
        ApiBody({ type: LectureApplyDto }),
        ApiCreatedResponse({ description: "참여 성공" })
      );
      break;

    case 'info':
      if (method === 'GET') return applyDecorators(
        ApiOperation({
          description: "강의 세부 정보 가져오기",
          summary: "강의 정보"
        }),
        ApiOkResponse({ description: "강의 정보 가져오기 성공" })
      );
      break;
  }
}
