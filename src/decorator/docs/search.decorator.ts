import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { GetResultDto } from 'src/search/dtos/getResult.dto';

type EndPoints =
  | 'hot'
  | 'upcoming-deadline'
  | 'recommend'
  | 'get-all'
  | '/';

export function Docs(endPoint: EndPoints) {
  switch (endPoint) {
    case 'hot': return applyDecorators(
      ApiOperation({
        description: "hot 강의 조회. 등록 인원 순으로 내림차순 정렬하여 조회  \nreturn값: [{id, name, description}]",
        summary: "HOT 강의 조회"
      }),
      ApiOkResponse({
        description: "강의 조회 성공"
      })
    );
    case 'upcoming-deadline': return applyDecorators(
      ApiOperation({
        description: "마감임박 강의 조회. 마감 시간 순으로 내림차순 정렬하여 조회  \nreturn값: [type: lecture/ user, {id, name, description, closeTime}]",
        summary: "마감임박 강의 조회"
      }),
      ApiOkResponse({
        description: "강의 조회 성공"
      })
    );
    case 'recommend': return applyDecorators(
      ApiOperation({
        description: "추천 조합 강의 조회. 아직 작동하지 않음  \nreturn값: [{id, name, description}]",
        summary: "추천 조합 강의 조회"
      }),
      ApiHeader({
        description: "header => authorization => bearer 에 access token 주세요",
        name: 'header',
        required: true,
      }),
      ApiOkResponse({
        description: "강의 조회 성공"
      })
    );
    case '/': return applyDecorators(
      ApiOperation({
        description: "keyword를 파라미터로 받아 강의 검색, 결과 조회.  \nreturn값: [{id, name, description}]",
        summary: "강의 검색"
      }),
      ApiParam({
        name: "keyword",
        type: String,
        description: "검색어(keyword)를 파라미터로 받음"
      }),
      ApiOkResponse({
        description: "강의 조회 성공"
      })
    );
    case 'get-all': return applyDecorators(
      ApiOperation({
        description: "모든 강의 검색.  \nreturn값: [{id, name, description}]",
        summary: "강의 검색"
      }),
      ApiOkResponse({
        description: "강의 검색 성공",
        type: [GetResultDto]
      })
    );
  }
}