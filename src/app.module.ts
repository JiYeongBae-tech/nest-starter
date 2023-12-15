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

import { User } from './entities/User';
import { Post } from './entities/Post';

import { ConfigModule } from '@nestjs/config';
// import { PostsService } from './posts/posts.service';
// import { PostsController } from './posts/posts.controller';
// import { PostsModule } from './posts/posts.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

//데코레이터 @Module
@Module({
  // imports: [
  //   TypeOrmModule.forRootAsync({
  //     imports : [],
  //     useClass: TypeormConfig,  // TODO: typeorm 설정한 클래스
  //     dataSourceFactory: async (options: DataSourceOptions) => {
  //       return new DataSource(options).initialize()
  //     }}),
  //   UsersModule,
  //   User,
  //   Post,
  //   TypeOrmModule.forFeature([User]),
  // ],
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    UsersModule,
    User,
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([User]),
    AuthModule,
  ],
  controllers: [AppController, UsersController], // 여느 프렘웍과 같이 http 요청 라우터 엔드포인트
  providers: [AppService, UsersService, AuthService], // 모듈에 필요한 provider 캡슐화되어사용. 다른 모듈에서 사용하고싶을때는  export
})
export class AppModule {}
