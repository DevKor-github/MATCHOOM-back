import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SearchService } from './search.service';
import { Docs } from 'src/decorator/docs/search.decorator';

@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService
  ) { }
  
  @Get('curation')
  async getCurationLecture() {
    
  }

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

  @Get('recommend')
  @UseGuards(AuthGuard('jwt-access'))
  async getRecommendLecture(@Req() req: any) {
    const userId = req.user.id;
    return await this.searchService.getRecommendLecture(userId);
  }

  @Get(':keyword')
  async getSearchResult(@Param('keyword') keyword: string) {

  }
}
