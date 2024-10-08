import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginRequestDto, LoginResponseDto } from 'src/auth/dtos/login.dto';
import { RegisterRequestDto, RegisterResponseDto } from 'src/auth/dtos/register.dto';
import { RenewTokenResponseDto } from 'src/auth/dtos/renewToken.dto';

type EndPoints =
  | 'register'
  | 'login'
  | 'logout'
  | 'refresh-token';

export function Docs(endPoint: EndPoints) {
  switch (endPoint) {
    case 'register': return applyDecorators(
      ApiOperation({
        description: "유저 정보를 받아 회원가입.  \nreturn 값 : id, nickname, refresh token, access token.  \n장르는 장르명 자체 대신 치환된 int값 array 전송.  \nbirthday는 yyyy-mm-dd 형식으로 전송.",
        summary: "회원가입"
      }),
      ApiBody({
        type: RegisterRequestDto,
      }),
      ApiCreatedResponse({
        description: "회원가입 성공",
        type: RegisterResponseDto
      })
    );
    case 'login': return applyDecorators(
      ApiOperation({
        description: "전화번호(userId), 비밀번호(password) 받아 로그인.  \nreturn 값 : id, refresh token, access token.",
        summary: "로그인"
      }),
      ApiBody({
        type: LoginRequestDto
      }),
      ApiCreatedResponse({
        description: "로그인 성공",
        type: LoginResponseDto
      }),
      ApiUnauthorizedResponse({
        description: "로그인 실패"
      })
    );
    case 'logout': return applyDecorators(
      ApiOperation({
        description: "로그아웃. 토큰 삭제를 위해 header를 통해서 refresh token 주세요",
        summary: "로그아웃"
      }),
      ApiHeader({
        description: 'header => authorization => bearer 에 refresh token 주세요.',
        name: 'header',
        required: true,
      }),
      ApiOkResponse({
        description: "로그아웃 성공"
      }),
      ApiUnauthorizedResponse({
        description: "로그아웃 실패"
      })
    );
    case 'refresh-token': return applyDecorators(
      ApiOperation({
        description: "refresh token을 헤더로 받아 access token을 갱신.  \nreturn 값: accessToken",
        summary: "토큰 갱신"
      }),
      ApiHeader({
        description: 'header => authorization => bearer 에 refresh token 주세요',
        name: 'header',
        required: true,
      }),
      ApiCreatedResponse({
        type: RenewTokenResponseDto,
        description: "토큰 갱신 성공"
      }),
      ApiUnauthorizedResponse({
        description: "토큰 갱신 실패"
      })
    );
  }
}