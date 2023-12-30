import {Injectable, Logger} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Server, Socket } from 'socket.io';
@Injectable()
export class ChatService {

    private readonly logger = new Logger(ChatService.name);
    constructor() {}


    private mutex = false;
    /** 선물받기 눌렀을때 뮤텍스 처리 */
    async processGift() {
        // uuid 모듈을 가져옵니다.
        const { v4: uuidv4 } = require('uuid');

        console.log(`============mutex : ${this.mutex} `)
        const msguuid = uuidv4();
        if (!this.mutex) {
            this.mutex = true;
            // 여기에서 실제 선물 처리 로직을 수행
            this.logger.log(`스레드 차지성공. 5초동안 작업시작!... ${msguuid}`);
            await new Promise((resolve) => setTimeout(resolve, 10000)); // 예시로 5초 동안 처리 중이라 가정
            this.mutex = false;
        } else {
            this.logger.log(`기다리기. 누군가 이미 스레드 차지함... ${msguuid}`);
            // 다른 사용자가 선물 처리 중일 때의 처리 로직 추가
        }
    }

    generateUUID(): string {
        return uuidv4();
    }

    /** 동일한 채팅방에 메시지 날리기*/
    broadcast(event: string, client: Socket, message: any, server: Server) : void {
        this.logger.log(`========= 방 이름 : ${event} : 메세지 보낸 사람과 메시지 내용 , 메세지고유uuid : ${message}`)
        this.logger.log(`========= 메세지를 보낸 방 고유 id : ${client.id} `)

        // 객체 배열 전체를 출력
        // console.log(util.inspect(this.server.sockets, { depth: 1 }));

        const socketList =server.sockets; //소켓에 연결된 전체 소켓객체 맵배열
        if (socketList instanceof Map) {
            for (let id of socketList.keys()) {
                if (id !== client.id) {
                    /**
                     * 매개변수로 받은 client 의 방 고유id 값과 for문 도는 소켓객체의 방고유id 값을 비교해서 동일하면 같은 채팅방이니 emit 날리기
                     * */
                    // this.logger.log(`>> id ${id} ` )
                    // this.logger.log(`>> client.id  ${client.id} ` )
                    // this.logger.log(`>> client   ${client} ` )
                    // this.logger.log('-')
                    socketList.get(id).emit(event, message);
                }else {
                }
            }
        } else {
            this.logger.error('socketList is not a Map.');
        }
    }


    /** 동일한 채팅방에 선물받기 날리기*/
    broadcastGiftBox(event: string, client: Socket, message: any, server: Server) : void {
        this.logger.log(`========= broadcastGiftBox 방 이름 : ${event} : 메세지 보낸 사람과 메시지 내용 , 메세지고유uuid : ${message}`)
        this.logger.log(`========= 메세지를 보낸 방 고유 id : ${client.id} `)

        const socketList =server.sockets; //소켓에 연결된 전체 소켓객체 맵배열
        if (socketList instanceof Map) {
            for (let id of socketList.keys()) {
                if (id !== client.id) {
                    /**
                     * 매개변수로 받은 client 의 방 고유id 값과 for문 도는 소켓객체의 방고유id 값을 비교해서 동일하면 같은 채팅방이니 emit 날리기
                     * */
                    // this.logger.log(`>> id ${id} ` )
                    // this.logger.log(`>> client.id  ${client.id} ` )
                    // this.logger.log(`>> client   ${client} ` )
                    // this.logger.log('-')
                    socketList.get(id).emit(event+'-giftBox', message);
                }else {
                }
            }
        } else {
            this.logger.error('socketList is not a Map.');
        }
    }


    saveToDatabase(room: string, chatuuid: string, clickNum: string): void {
        // Implement database saving logic here
    }
}
