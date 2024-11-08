import { Body, Controller, Patch, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/decorator/user.decorator';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor (
    private readonly userService: UserService
  ) { }

  @Patch('/')
  @UseGuards(AuthGuard('jwt-access'))
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 5 * 1024 * 1024 } }))
  async updateUser(@User() user, @Body() updateUserDto: UpdateUserDto, @UploadedFile() file: Express.Multer.File) {
    await this.userService.updateUser(user.id, updateUserDto, file);
  }
}
