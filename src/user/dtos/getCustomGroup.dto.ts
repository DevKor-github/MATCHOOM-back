import { ApiProperty } from '@nestjs/swagger';

class GetCustomGroupDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: "수강중인 강의" })
  name: string;

  @ApiProperty({ example: 1 })
  order: number;
}

class GetCustomGroupInfoDto {
  
}

export { GetCustomGroupDto }
