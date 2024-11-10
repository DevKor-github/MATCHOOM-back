import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UpdateUserDto } from 'src/user/dtos/updateUser.dto';

type EndPoints =
  | 'update'
  | 'delete'
  | 'get'

export function Docs(endPoint: EndPoints) {
  switch (endPoint) {
    case 'update': return applyDecorators(
      ApiOperation({
        description: "유저 정보 수정.  \n모든 key와 이미지 파일이 nullable이기 때문에 수정되는 정보만 넘겨주면 됨.  \n파일은 .jpg, .jpeg, .png만 전송 가능.",
        summary: "유저 정보 수정"
      }),
      ApiHeader({
        description: 'header => authorization => bearer 에 access token 주세요.',
        name: 'header',
        required: true,
      }),
      ApiBody({
        description: "",
        schema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
              description: '프로필 이미지. .jpg, .jpeg, .png 형식만 지원. 크기는 5mb 이하'
            },
          }
        }
      }),
      ApiConsumes('multipart/form-data'),
      ApiOkResponse({
        description: "유저 정보 수정 성공"
      }),
      ApiUnauthorizedResponse({
        description: "유저 정보 수정 실패"
      })
    );
    case 'delete': return applyDecorators(
      ApiOperation({
        description: "refresh token을 헤더로 받아 access token을 갱신.  \nreturn 값: accessToken",
        summary: "유저 삭제"
      }),
      ApiHeader({
        description: 'header => authorization => bearer 에 access token 주세요',
        name: 'header',
        required: true,
      }),
      ApiCreatedResponse({
        description: "토큰 갱신 성공"
      }),
      ApiUnauthorizedResponse({
        description: "토큰 갱신 실패"
      })
    );
  }
}