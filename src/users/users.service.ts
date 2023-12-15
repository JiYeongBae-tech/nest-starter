import {Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User'; //User로 인포트하면 에러남  baej
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ){}

    /** /Join 엔드포인트에서 실행하는 실직적 로직 */
    async Join(email:string, name:string, age:number, password:string){
        const newuser = await this.usersRepository.findOne({where:{email}});
        if(newuser){
            throw new UnauthorizedException('동일 이메일이 존재하는 사용자입니다.')
            return;
        }else{
            Logger.log('======>  회원 db등록')
            const hashedpassword = await bcrypt.hash(password, 12);
            await this.usersRepository.save({
                email,
                name,
                age,
                password:hashedpassword,
            })
        }
    }

    async login(){
        Logger.log('======>login service logic')
    }
}
