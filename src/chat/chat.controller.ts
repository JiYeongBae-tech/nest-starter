import {Body, Controller, Get, Logger, Post} from '@nestjs/common';
import {ChatService} from "./chat.service";

@Controller('chat')
export class ChatController {
    private logger = new Logger('chatController')
    constructor(private readonly chatService: ChatService) {}

    @Post('givegift')
    async giveGift(
        @Body() data: string
    ) {
        this.logger.log(`========닉네임 ${data['nickname']} 님이 선물 버튼을 누름`)
        // 여기에서 뮤텍스를 사용하여 작업을 수행
        await this.chatService.processGift();
        this.logger.log('@@@@@@@@@@ 뮤텍스 끝 @@@@@@@@@@@2 ')
        this.logger.log('')
        return 'Gift given!';
    }
}
