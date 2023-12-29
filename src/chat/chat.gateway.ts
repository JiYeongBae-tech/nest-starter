import {
  ConnectedSocket,
  MessageBody, OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import {Logger} from "@nestjs/common";
import * as util from 'util';
// uuid 모듈을 가져옵니다.
const { v4: uuidv4 } = require('uuid');

@WebSocketGateway(8081,{
  namespace: 'chat' ,
  cors: {
    origin: 'http://localhost:3002',
  }
})
export class ChatGateway implements OnGatewayInit{
  private logger = new Logger('chat')
  constructor() {
    this.logger.log('========constructor')
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`disconnected : ${socket.id} ${socket.nsp.name}`);
    // aaa 종료 -> disconnected : 4QXh2IZwnaEeduyaAAAD /chattings
    // nsp : namespace
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connected : ${socket.id} ${socket.nsp.name}`);
    // aaa 연결 -> connected : vgqhXYVjrgJ8GujUAAAB /chattings
  }

  afterInit(server: any): any {
    this.logger.log('======== init ')
  }

  @WebSocketServer()
  server: Server;

  /** 각 소켓연결이 처음으로 연결될 때*/
  @SubscribeMessage('hihi')
  connectSomeone(
      @MessageBody() data: string,
      @ConnectedSocket() socket: Socket,
  ) {
    const [nickname, room] = data;
    this.logger.log(`${nickname}님이 코드: ${room}방에 접속했습니다.`)
    const comeOn = `${nickname}님이 입장했습니다.`;
    this.server.emit('comeOn' + room, comeOn);
  }


  /** 동일한 채팅방에 메시지 날리기*/
  private broadcast(event, client, message: any) {
    this.logger.log(`========= 방 이름 : ${event} : 메세지 보낸 사람과 메시지 내용 , 메세지고유uuid : ${message}`)
    this.logger.log(`========= 메세지를 보낸 방 고유 id : ${client.id} `)

    // 객체 배열 전체를 출력
    // console.log(util.inspect(this.server.sockets, { depth: 1 }));

    const socketList = this.server.sockets; //소켓에 연결된 전체 소켓객체 맵배열
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


  @SubscribeMessage('send')
  handleNewUser(
      @MessageBody() data: string,
      @ConnectedSocket() socket: Socket,
  ) {
    const [room, nickname, message] = data;

    // UUID 생성
    const msguuid = uuidv4();

    this.logger.log(`[START MSG] 메세지를 보낸 방 고유 id  ${socket.id}  / 채팅메시지의 고유uuid : ${msguuid} /  방이름 보낸사람 메시지 : ${data}`);
    this.broadcast(room, socket, [nickname, message , msguuid]);
    return 'hello world';
  }


  @SubscribeMessage('likeClick')
  handleClickEvent( @MessageBody() data: string,
                    @ConnectedSocket() socket: Socket,){
    const [ room, chatuuid ,clickNum ] = data;

    this.logger.log(`======Received click event from ${socket.id},
       채팅방 id : ${room} , 
       채팅 uuid : ${chatuuid},
       Click Count: ${clickNum}`);

  }
}