import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //provider로 제공된 app.service 의 엔드포인트 함수를 사용한다는 의미
  @Get('/users')
  getHello(): string {
    return this.appService.getHello();
  }

}
