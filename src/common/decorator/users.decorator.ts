// ./src/common/decorators/users.decorator.ts
/**
 * 로그인 성공 시 response해줄 user정보
 */
import {createParamDecorator, ExecutionContext, Logger} from "@nestjs/common";

export const Users = createParamDecorator(
    (data:unknown, ctx:ExecutionContext)=>{
        Logger.warn('=========> user 데코레이터 : ')
        const request = ctx.switchToHttp().getRequest();
        Logger.warn('=========> user 데코레이터 response : ' )
        console.log(request.user)
        return request.user;
    }
)