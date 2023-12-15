import {ExecutionContext, Injectable, Logger} from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';

/** LocalAuthGuard 클래스는 Injectable 데코레이터 사용해 NestJS의 의존성 주입을 허용하는 서비스로 정의됩니다.*/
 @Injectable()
export class LocalAuthGuard extends AuthGuard('local'){ // ==passport.authenticate('local')
    async canActivate(context:ExecutionContext):Promise<boolean>{
        /**  ExecutionContext 를 받아 Promise<boolean> 반환
         * 이 메서드는 가드가 요청을 처리할 수 있는지 여부를 결정.
         * */
        Logger.warn('======> local auth guard 1')

        /** 패스포트 생명주기 1*/
        const can = await super.canActivate(context); /**  Passport가 로컬 전략을 사용하여 인증을 시도하도록 합니다.*/
        Logger.warn('======> local auth guard 2')

        /** 인증에 성공*/
        if(can){
            /** ExecutionContext를 사용하여 요청을 가져옵니다.
             * 이 요청 정보를 바탕으로 로그인을 실행할 수 있도록 하는 것이다.*/
            const request = context.switchToHttp().getRequest();
            // 요청 정보 바탕으로 로그인.
            Logger.warn('======> login for cookie')

            /** 패스포트 생명주기 3*/
            await super.logIn(request); /** Passport에게 인증된 사용자 정보를 기반으로 세션을 시작하도록 합니다. */
            /** 이때, 세션을 시작하면 Passport가 사용자 정보를 세션에 저장하고 관리합니다.*/
        }
        return true;
    }
}