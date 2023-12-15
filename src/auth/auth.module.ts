
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/User";
import { AuthService } from "./auth.service";
import { LocalSerializer } from "./local.serializer";
import { LocalStrategy } from "./local.strategy";

/**
 * PassportModule.register({session:true})에서 session이 필요한 경우면 true해주면 된다.
 *
 * (jwt를 사용하는 경우면 false)
 */
@Module({
    imports:[
        PassportModule.register({session:true}),
        TypeOrmModule.forFeature([User]),
    ],
    providers:[AuthService, LocalStrategy, LocalSerializer] /** 여기있으면 최초 로딩 시 먼저 실행됨!! */
})

export class AuthModule{}
