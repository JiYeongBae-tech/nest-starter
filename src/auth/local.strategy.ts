// ./src/auth/local.strategy.ts

import { Injectable, UnauthorizedException, Logger } from "@nestjs/common";
import { Strategy } from 'passport-local';
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    /** AuthService 와 연결되어있음 */
    /**
     * local.strategy.ts와 authService가 차례로 실행됐었는데
     * 코드 내용을 보면 이 내용이 곧 express의 localStrategy.js와 동일하다.
     * (사용자 정보 가져와 아이디 비밀번호 비교 후 done()리턴)
     */
    constructor(private authService:AuthService){
        super({usernameField:'email', passwordField:'password'});
        /** 단순 이메일과 비번을 받아 유저가 있는지 확인하고 , 있으면 리턴하기*/
        Logger.warn('======> local strategy')
    }

    /**
     * Passport 전략(LocalStrategy)의 validate 메서드는
     * Passport가 수신된 요청에서 필요한 자격 증명(예: 이메일 및 비밀번호)을 성공적으로 추출한 후에 자동으로 호출됩니다.
     */
    /** 패스포트 생명주기 2*/
    async validate(email:string, password:string, done:CallableFunction){
        Logger.warn('======> 222 local strategy validate')
        const user = await this.authService.validateUser(email, password); /** => AuthService 실행 */

        Logger.warn('======> 33 local strategy validate ' , user )
        if(!user){
            throw new UnauthorizedException(); /** 401error 사용자가 유효성을 검사하지 못한 경우*/
        }
        return done(null, user); /** 사용자가 성공적으로 유효성을 검사한 경우, done 함수를 null 및 사용자 객체로 호출합니다.*/
    }
}