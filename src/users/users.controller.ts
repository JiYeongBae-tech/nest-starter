import {Body, Controller, Logger, Post, Get, Req, UseGuards, Res} from '@nestjs/common';
import {UsersService} from "./users.service";
import {Users} from '../common/decorator/users.decorator';
import {LocalAuthGuard} from '../auth/local-auth.guard';
import {LoggedInGuard} from '../auth/logged-in.guard';

@Controller('users')
export class UsersController {
    constructor(private UsersService:UsersService) {}

    /** 회원가입 엔드포인트*/
    @Post("join")
    async Join(@Body() body){
        Logger.log('info => ' , body)
        Logger.warn('warning')
        Logger.error('something went wrong! ')
        await this.UsersService.Join(body.email  , body.name , body.age,
            body.password)
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    logIn(@Users() user){ /** @Users 데코레이션 사용. src/common/decorator/users.decorator.ts */
        Logger.warn('=========> user 컨트롤러 ')
        console.log('===========> user : ' , user)
        return user
    }

    /**  LoggedInGuard는 사용자가 인증되어 있는지 확인하고 logOut 루트에 액세스를 허용하는 것으로 보입니다.*/
    @UseGuards(LoggedInGuard)
    @Post('logout')
    logOut(@Req() req , @Res() res){
        Logger.log('======> logout controller ')
        req.logOut();
        /**  이 쿠키는 세션 ID를 저장하는 데 자주 사용됩니다*/
        res.clearCookie('connect.sid' , {httpOnly: true});
        res.send('OK!')
    }

}
