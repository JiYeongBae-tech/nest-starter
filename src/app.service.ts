import {Injectable, Logger} from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  private mutex = false;
  private readonly logger = new Logger(AppService.name);

  async processGift() {

    // uuid 모듈을 가져옵니다.
    const { v4: uuidv4 } = require('uuid');

    const msguuid = uuidv4();
    if (!this.mutex) {
      this.mutex = true;
      // 여기에서 실제 선물 처리 로직을 수행
      this.logger.log(`스레드 차지성공. 5초동안 작업시작!... ${msguuid}`);
      await new Promise((resolve) => setTimeout(resolve, 5000)); // 예시로 5초 동안 처리 중이라 가정
      this.mutex = false;
    } else {
      this.logger.log(`기다리기. 누군가 이미 스레드 차지함... ${msguuid}`);
      // 다른 사용자가 선물 처리 중일 때의 처리 로직 추가
    }
  }
}
