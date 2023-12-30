import {
  ConnectedSocket,
  MessageBody, OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import {Logger} from "@nestjs/common";
import {ChatService} from "./chat.service";
import * as util from 'util';

@WebSocketGateway(8081,{
  namespace: 'chat' ,
  cors: {
    origin: 'http://localhost:3002',
  }
})
export class ChatGateway implements OnGatewayInit{
  private logger = new Logger('chat')
  constructor(private readonly chatService : ChatService) {
    this.logger.log('======== chat.gateway constructor')
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


  @SubscribeMessage('send')
  handleChatMsg(
      @MessageBody() data: string,
      @ConnectedSocket() socket: Socket,
  ) {
    const [room, nickname, message] = data;
    const msguuid = this.chatService.generateUUID();

    this.logger.log(`[START MSG] 메세지를 보낸 방 고유 id  ${socket.id}  / 채팅메시지의 고유uuid : ${msguuid}
     /  방이름 보낸사람 메시지 : ${data}`);
    this.chatService.broadcast(room, socket, [nickname, message , msguuid] , this.server);
    return 'hello world';
  }

  @SubscribeMessage('sendGiftBox')
  handleChatGiftMsg(
      @MessageBody() data: string,
      @ConnectedSocket() socket: Socket,
  ) {
    const [room, nickname, message] = data;
    const msguuid = this.chatService.generateUUID();

    this.logger.log(`[START sendGiftBox] 메세지를 보낸 방 고유 id  ${socket.id}  / 채팅메시지의 고유uuid : ${msguuid}
     /  방이름 보낸사람 메시지 : ${data}`);
    this.chatService.broadcastGiftBox(room, socket, [nickname, message , msguuid] , this.server);
    return 'hello world';
  }




  @SubscribeMessage('likeClick')
  handleClickEvent( @MessageBody() data: string,
                    @ConnectedSocket() socket: Socket,){
    const [ room, nickname, chatuuid ,clickNum ] = data;

    this.server.emit('likes' + room, data);

    /** database에 저장하기 */

    this.logger.log(`======Received click event from ${socket.id},
       채팅방 id : ${room} , 
       채팅 uuid : ${chatuuid},
       Click Count: ${clickNum}`);

  }
}