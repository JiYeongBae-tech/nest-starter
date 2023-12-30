import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource, DataSourceOptions } from 'typeorm'

import  * as ormconfig from '../ormconfig'// baej
// import { TypeormConfig } from './database/typeorm.config'// baej

import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { PostsModule } from './posts/posts.module';

import { ConfigModule } from '@nestjs/config';
// import { PostsService } from './posts/posts.service';
// import { PostsController } from './posts/posts.controller';
// import { PostsModule } from './posts/posts.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

import { SurveyController } from './survey/survey.controller';
import { SurveyService } from './survey/survey.service';
import { SurveyModule } from './survey/survey.module';

import { User } from './entities/User';
import { Post } from './entities/Post';
import { SurveyKey } from './entities/SurveyKey';
import {SurveyKeyTypeUnit} from "./entities/SurveyKeyTypeUnit";
import  {SurveyKeyType} from "./entities/SurveyKeyType";
import {SurveyTemplate} from './entities/SurveyTemplate'

import {CommonHelper} from './common/helper/commonHelper'
import {HttpModule, HttpService} from "@nestjs/axios";
import { ChatGateway } from './chat/chat.gateway';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChatModule } from './chat/chat.module';


//데코레이터 @Module
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),
      /** static html files */
    // // ServeStaticModule.forRoot({
    // //   rootPath: join(__dirname, '..', 'static'),   // <-- path to the static files
    //  // //exclude: ['/api/(.*)'],
    // // }),

      HttpModule,
      SurveyModule,
      UsersModule,
    ChatModule,
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([User ,SurveyKeyType , SurveyTemplate , SurveyKeyTypeUnit , SurveyKey]),

  ],
  controllers: [AppController, UsersController, SurveyController], // 여느 프렘웍과 같이 http 요청 라우터 엔드포인트
  providers: [AppService, UsersService, AuthService, SurveyService , CommonHelper ], // 모듈에 필요한 provider 캡슐화되어사용. 다른 모듈에서 사용하고싶을때는  export
  exports: [CommonHelper], // 다른 모듈에서도 사용할 수 있도록 export
})
export class AppModule {}
