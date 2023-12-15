import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import passport from 'passport';
import  expressSession from 'express-session';

declare const module : any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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


  await app.listen(3000);
  /** nodemon 대신 webpack */
  if(module.hot){
    module.hot.accept();
    module.hot.dispose(()=>app.close())
  }
}
bootstrap();
