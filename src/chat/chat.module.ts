import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import {ChatController} from "./chat.controller";

@Module({
    controllers: [ChatController], // 여느 프렘웍과 같이 http 요청 라우터 엔드포인트

    providers: [ChatGateway, ChatService],
})
export class ChatModule {}