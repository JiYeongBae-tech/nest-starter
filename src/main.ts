import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import passport from 'passport';
import  expressSession from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

declare const module : any;

async function bootstrap() {
  /**
   *  NestJS 애플리케이션을 생성하는 팩토리 클래스
   *  create 메서드는 주어진 모듈을 사용하여 NestJS 애플리케이션을 생성
   *
   * <NestExpressApplication>:
   * TypeScript의 제네릭(Generic) 문법을 사용한 부분입니다.
   * NestExpressApplication은 NestJS 애플리케이션의 타입입니다. 이 타입은 Express 기반의 애플리케이션을 나타냅니다.
   * create 메서드에 제네릭으로 NestExpressApplication을 전달하여 해당 타입의 애플리케이션을 생성하고 반환합니다.
   *
   */

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.setGlobalPrefix('api'); //???

  /** static 파일 경로의 html 파일을 접근할 수 있다.*/
  app.useStaticAssets(join(__dirname, '..', 'static'));

  /** 채팅 > cors와  static폴더를 설정하는 코드를 추가한다*/
  // app.enableCors({});

  /** 스웨어api 연결*/
  const config = new DocumentBuilder()
      .setTitle('API문서명')
      .setDescription('API문서 설명')
      .setVersion('1.0') // API 버전
      .addCookieAuth('connect.sid') // 쿠키 옵션
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api',app,document) ;// {{api-url}}:{{api-port}}/api 엔드포인트


    /** src/main.ts 에 추가*/
    app.use(
        expressSession({
        resave:false,
        saveUninitialized:false,
        secret:process.env.COOKIE_SECRET,
        cookie:{
          httpOnly:true,
        }
      }),
  );
  app.use(passport.initialize())
  app.use(passport.session());

    /** 리슨 3002번 포트 */
    await app.listen(3002);
    console.log(`Application is running on: ${await app.getUrl()}`);


  /** nodemon 대신 webpack */
  if(module.hot){
    module.hot.accept();
    module.hot.dispose(()=>app.close())
  }
}

bootstrap();
