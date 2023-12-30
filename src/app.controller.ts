import {Body, Controller, Get, Logger, Param, Post, Query} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(AppController.name);

  //provider로 제공된 app.service 의 엔드포인트 함수를 사용한다는 의미
  @Get('/users')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('givegift')
  async giveGift(
      @Body() data: string
  ) {

    this.logger.log(`========닉네임 ${data['nickname']} 님이 선물 버튼을 누름`)
    // 여기에서 뮤텍스를 사용하여 작업을 수행
    await this.appService.processGift();
    this.logger.log('@@@@@@@@@@ 뮤텍스 끝 @@@@@@@@@@@2 ')
    this.logger.log('')
    return 'Gift given!';
  }


}
