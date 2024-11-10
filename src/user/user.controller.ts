import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/decorator/user.decorator';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from 'src/common/pipes/fileValidation.pipe';
import { ApiTags } from '@nestjs/swagger';
import { Docs } from 'src/decorator/docs/user.decorator';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor (
    private readonly userService: UserService
  ) { }

  @Patch('/')
  @UseGuards(AuthGuard('jwt-access'))
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 5 * 1024 * 1024 } }))
  @Docs('update')
  async updateUser(
    @User() user, @Body() updateUserDto: UpdateUserDto,
    @UploadedFile(new FileValidationPipe(['image/jpg', 'image/jpeg', 'image/png'])) file: Express.Multer.File
  ) {
    await this.userService.updateUser(user.id, updateUserDto, file);
  }

  @Delete('/')
  @UseGuards(AuthGuard('jwt-access'))
  @Docs('delete')
  async deleteUser(@User() user) {
    return await this.userService.deleteUser(user.id);
  }

  @Get('/myInfo')
  @UseGuards(AuthGuard('jwt-access'))
  async getMyInfo(@User() user) {
    return await this.userService.findUser(user.id);
  }

  @Get('/:id')
  async getUserInfo(@Param('id') id: number) {
    return await this.userService.findUser(id);
  }

  @Post('/follow')
  @UseGuards(AuthGuard('jwt-access'))
  async setFollowStatus(@User() user, @Body() followUserDto: any) {

  }
  
}
