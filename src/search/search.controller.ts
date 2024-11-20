import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SearchService } from './search.service';
import { Docs } from 'src/decorator/docs/search.decorator';
import { LoginUserDto } from 'src/auth/dtos/loginuser.dto';
import { User } from 'src/decorator/user.decorator';

@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService
  ) { }

  @Get('hot')
  @Docs('hot')
  async getHotLecture() {
    return await this.searchService.getHotLecture();
  }

  @Get('upcoming-deadline')
  @Docs('upcoming-deadline')
  async getUpcomingDeadlineLecture() {
    return await this.searchService.getUpcomingDeadlineLecture();
  }

  /*
  @Get('recommend')
  @UseGuards(AuthGuard('jwt-access'))
  @Docs('recommend')
  async getRecommendLecture(@Req() req: any) {
    const userId = req.user.id;
    return await this.searchService.getRecommendLecture(userId);
  }
  */

  @Get('')
  @Docs('/')
  @UseGuards(AuthGuard('jwt-access'))
  async getSearchResult(@Query('keyword') keyword: string) {
    return await this.searchService.getSearchResult(keyword);
  }

  @Get('get-all')
  @Docs('get-all')
  async findAll() {
    return await this.searchService.findAll();
  }
  
  /*
  @Get('ac')
  @UseGuards(AuthGuard('jwt-access'))
  async getAutocomplete(@Param('q') keyword: string, @User() user: LoginUserDto){
    return await this.searchService.onSearch(keyword, user.id)
  }
    @Get('curation')
  async getCurationLecture() {}
  */
}
