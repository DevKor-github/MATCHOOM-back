import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { GetHomeResponseDto } from 'src/search/dtos/getHome.dto';
import { GetResultDto } from 'src/search/dtos/getResult.dto';

type EndPoints =
  | 'curation'
  | 'curation-home'
  | 'hot'
  | 'hot-home'
  | 'upcoming-deadline'
  | 'upcoming-deadline-home'
  | 'recommend'
  | 'recommend-home'
  | 'get-all'
  | 'home'
  | 'results';

export function Docs(endPoint: EndPoints) {
  switch (endPoint) {
    case 'curation': return applyDecorators(
      ApiOperation({
        description: "오늘의 큐레이션 조회. 아직 정해진 기준이 없어 임의의 강의 전송.   \nreturn값: [{id, name, description}]",
        summary: "오늘의 큐레이션 조회"
      }),
      ApiOkResponse({
        description: "강의 조회 성공"
      }),
      ApiNotFoundResponse({
        description: "강의 조회 실패(존재 하지 않는 강의)"
      }),
    );   
    case 'curation-home': return applyDecorators(
      ApiOperation({
        description: "오늘의 큐레이션 조회. 아직 정해진 기준이 없어 임의의 강의 전송.   \nreturn값: [{id, name, description}]",
        summary: "오늘의 큐레이션 조회(홈 화면 전용)"
      }),
      ApiOkResponse({
        description: "강의 조회 성공"
      }),
      ApiNotFoundResponse({
        description: "강의 조회 실패(존재 하지 않는 강의)"
      }),
    );   
    case 'hot': return applyDecorators(
      ApiOperation({
        description: "hot 강의 조회. 등록 인원 순으로 내림차순 정렬하여 조회  \nreturn값: [{id, name, description}]",
        summary: "HOT 강의 조회"
      }),
      ApiOkResponse({
        description: "강의 조회 성공"
      })
    );
    case 'hot-home': return applyDecorators(
      ApiOperation({
        description: "hot 강의 조회. 등록 인원 순으로 내림차순 정렬하여 조회  \nreturn값: [{id, name, description}]",
        summary: "HOT 강의 조회(홈 화면 전용)"
      }),
      ApiOkResponse({
        description: "강의 조회 성공"
      }),
      ApiNotFoundResponse({
        description: "강의 조회 실패(존재 하지 않는 강의)"
      })
    );
    case 'upcoming-deadline': return applyDecorators(
      ApiOperation({
        description: "마감임박 강의 조회. 남은 신청 가능 인원 순으로 내림차순 정렬하여 조회  \nreturn값: [{id, name, description, closeTime}]",
        summary: "마감임박 강의 조회"
      }),
      ApiOkResponse({
        description: "강의 조회 성공"
      }),
      ApiNotFoundResponse({
        description: "강의 조회 실패(존재 하지 않는 강의)"
      })
    );
    case 'upcoming-deadline-home': return applyDecorators(
      ApiOperation({
        description: "마감임박 강의 조회. 남은 신청 가능 인원 순으로 내림차순 정렬하여 조회  \nreturn값: [{id, name, description, closeTime}]",
        summary: "마감임박 강의 조회(홈 화면 전용)"
      }),
      ApiOkResponse({
        description: "강의 조회 성공"
      }),
      ApiNotFoundResponse({
        description: "강의 조회 실패(존재 하지 않는 강의)"
      })
    );
    case 'recommend': return applyDecorators(
      ApiOperation({
        description: "추천 조합 강의 조회. 아직 정해진 추천 기준이 없어 임의의 강의 전송.   \nreturn값: [{id, name, description}]",
        summary: "추천 조합 강의 조회(홈 화면 전용)"
      }),
      ApiOkResponse({
        description: "강의 조회 성공"
      }),
      ApiNotFoundResponse({
        description: "강의 조회 실패(존재 하지 않는 강의)"
      }),
    );    
    case 'recommend-home': return applyDecorators(
      ApiOperation({
        description: "추천 조합 강의 조회. 아직 정해진 추천 기준이 없어 임의의 강의 전송.  \nreturn값: [{id, name, description}]",
        summary: "추천 조합 강의 조회"
      }),
      ApiOkResponse({
        description: "강의 조회 성공"
      }),
      ApiNotFoundResponse({
        description: "강의 조회 실패(존재 하지 않는 강의)"
      }),
    );
    case 'results': return applyDecorators(
      ApiOperation({
        description: "keyword를 파라미터로 받아 강의 검색, 결과 조회.  \nreturn값: [type: lecture, data: {id, name, description}]",
        summary: "강의 검색"
      }),
      ApiQuery({
        name: "keyword",
        type: String,
        description: "검색어(keyword)를 파라미터로 받음"
      }),
      ApiQuery({
        name: "page",
        type: Number,
        description: "페이지(page)를 파라미터로 받음.  \n무한 스크롤이나 페이지네이션을 고려.  \npage입력 안할 시 1페이지 전송"
      }),
      ApiOkResponse({
        description: "강의 조회 성공.  \nlecture: [{id, name, description}] 반환 isEnd는 불러 올 데이터가 더 이상 없는 경우 true",
        example: {
          isEnd: true,
          lecture: [{
            id: 1,
            name: "강의 제목 입니다.",
            description: "강의 설명입니다."
          }]
        }
      }),
      ApiNotFoundResponse({
        description: "강의 조회 실패(존재 하지 않는 강의)"
      }),
      ApiUnauthorizedResponse({
        description: "강의 조회 실패(인증되지 않은 사용자)"
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
      }),
      ApiNotFoundResponse({
        description: "강의 조회 실패(존재 하지 않는 강의)"
      })
    );
  }
}