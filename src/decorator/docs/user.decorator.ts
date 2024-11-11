import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiHeader, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiUnauthorizedResponse, getSchemaPath } from '@nestjs/swagger';
import { GetUserDto } from 'src/user/dtos/getUser.dto';
import { UpdateUserDto } from 'src/user/dtos/updateUser.dto';

type EndPoints =
  | 'update'
  | 'delete'
  | 'getUserInfo'
  | 'getMyInfo'
  | 'follow'

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
              description: '프로필 이미지 파일.  \npng, jpg, jpeg 형식만 지원합니다.  \n크기는 5mb 미만'
            },
            nickname: { type: 'string', description: '닉네임', example: '닉네임' },
            birthday: { type: 'string', description: '생년월일', example: '1900-01-01' },
            gender: { type: 'string', description: '성별', example: 'male,female,other' },
            address: { type: 'string', description: '주소', example: '서울특별시 성북구 안암로 145' },
            genres: { type: 'array', items: { type: 'integer' }, description: "각 장르에 해당하는 id값을 넘겨주세요", example: [0, 1, 2]  }
          },
        },
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
        description: "회원 탈퇴",
        summary: "회원 탈퇴"
      }),
      ApiHeader({
        description: 'header => authorization => bearer 에 access token 주세요',
        name: 'header',
        required: true,
      }),
      ApiOkResponse({
        description: "회원 탈퇴 성공"
      }),
      ApiUnauthorizedResponse({
        description: "회원 탈퇴 실패"
      })
    );
    case 'getUserInfo': return applyDecorators(
      ApiOperation({
        description: "parameter: 조회 대상 유저 id.  \nreturn값 nickname, description, profileImagePath",
        summary: "유저 정보 조회(타인 프로필 조회)"
      }),
      ApiParam({
        name: "id",
        type: Number,
        description: "유저 id(고유 id)를 파라미터로 받음"
      }),
      ApiOkResponse({
        description: "유저 조회 성공",
        type: GetUserDto
      }),
      ApiNotFoundResponse({
        description: "유저 조회 실패"
      })
    );
    case 'getMyInfo': return applyDecorators(
      ApiOperation({
        description: "parameter: 조회 대상 유저 id.  \nreturn값 userId(전화번호), name, nickname, birthday, gender, genre, address, description, profileImagePath",
        summary: "유저 정보 조회(타인 프로필 조회)"
      }),
      ApiHeader({
        description: 'header => authorization => bearer 에 access token 주세요',
        name: 'header',
        required: true,
      }),
      ApiParam({
        name: "id",
        type: Number,
        description: "유저 id(고유 id)를 파라미터로 받음"
      }),
      ApiOkResponse({
        description: "유저 조회 성공",
        type: GetUserDto
      }),
      ApiNotFoundResponse({
        description: "유저 조회 실패"
      })
    );
    case 'follow': return applyDecorators(
      ApiOperation({
        description: "팔로우/언팔로우.  \n언팔로우 상태일 시 팔로우, 팔로우 상태일 시 언팔로우.",
        summary: "팔로우/언팔로우"
      }),
    );
  }
}