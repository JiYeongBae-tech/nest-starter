import {ExecutionContext, Injectable, Logger} from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
/** 예제코드가 없었다!!!!!!!!!! ㅠㅠ 임시코드*/
@Injectable()
export class LoggedInGuard extends AuthGuard('local'){ // ==passport.authenticate('local')
    async canActivate(context:ExecutionContext):Promise<boolean>{
        const can = await super.canActivate(context);
        if(can){
            /**ExecutionContext로부터 요청을 가져온 뒤
             * 이 요청 정보를 바탕으로 로그인을 실행할 수 있도록 하는 것이다.*/
            const request = context.switchToHttp().getRequest();
            // 요청 정보 바탕으로 로그인.
            Logger.log('======> LoggedInGuard ')

            await super.logIn(request);
        }
        return true;
    }
}