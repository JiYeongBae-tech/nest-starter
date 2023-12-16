// ./src/auth/local.serializer.ts

import {Injectable, Logger} from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/User";
import { Repository } from "typeorm";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalSerializer extends PassportSerializer{
    constructor(
        private readonly authService:AuthService,
        @InjectRepository(User) private userRepository:Repository<User>
    ){

        super();
        Logger.warn('===========> local serializer.ts ')
    }

    /**
     * Passport는 사용자 정보를 세션에 저장하기 위해 serializeUser 메서드를 호출합니다
     *  호출시점: 사용자가 로그인할때 Passport는 이 메서드를 호출하여 사용자의 식별자를 세션에 저장합니다.
     *
     *  파라미터 : user => 로그인한 사용자의 객체
     *  기능 :  세션에 아이디값만 저장해두고
     */
    /** 패스포트 생명주기 4*/
    serializeUser(user: User, done: CallableFunction){
        Logger.warn('===========> serializeUser ')

        done(null, user.id)
    }

    /**
     *
     *  Passport의 세션 관리 기능 중 하나로,
     *  사용자 객체를 식별자(여기서는 userId로 전달됨)를 통해 데이터베이스에서 가져와 세션에 저장합니다.
     * 기능 : serializeUser 에 저장된 아이디값으로 다른 정보들을 가져오는 동작
     */
    async deserializeUser(userId: string, done: CallableFunction){
        /** 세션에 한번 저장된 후로 이 메소드를 호출한다!!!!!! */
        Logger.warn('===========> deserializeUser ' , userId)

        try {
            // const userd= await this.userRepository.findOneOrFail({id : userId});
                // {id: userId,}, {select: ['id', 'email', 'name', 'age']});


            // console.log('=========> userd : ' , userd)
            // done(null ,userd)
        } catch (error){
            done(error)
        }
    }
}