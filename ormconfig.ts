import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { Post } from '../entities/Post';
import { User } from './src/entities/User';
import *as dotenv from 'dotenv';

dotenv.config();
const config:TypeOrmModuleOptions = {
    type:'mysql',
    host:process.env.DB_HOST,
    port:3306,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    entities:[
        User,
        __dirname + '/src/**/*.entity{.ts,.js}', //소스 파일이 src 디렉토리에 있다고 가정하고, ormconfig.ts 파일의 위치를 기준으로 상대 경로를 사용하는 것
        // __dirname + '/**/*.entity{.ts,.js}' //TODO: 중요! 엔티티 클래스 경로
    ],
    synchronize : false, // 한번 true한 뒤로는 무조건 false
    autoLoadEntities:true,
    charset:'utf8mb4',
    logging:true,
    keepConnectionAlive:true,


}

export = config;