// ./src/auth/auth.service.ts

import {Injectable, Logger} from "@nestjs/common";
import { User } from "src/entities/User";
import { Repository } from "typeorm";
import bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class AuthService{
    constructor(@InjectRepository(User) private usersRepository:Repository<User>){
        Logger.warn('======> auth service constructor ')
    }

    async validateUser(email:string, password:string){
        Logger.warn('======> auth service validate user ')

        /**
         * SELECT `User`.`id` AS `User_id`, `User`.`email` AS `User_email`, `User`.`name` AS `User_name`, `User`.`age` AS `User_age`, `User`.`password` AS `User_password`, `User`.`createdAt` AS `User_createdAt`, `User`.`updatedAt` AS `User_updatedAt`, `User`.`deletedAt` AS `User_deletedAt`
         * FROM `UsersT` `User`
         * WHERE ( (`User`.`email` = ?) )
         * AND ( `User`.`deletedAt` IS NULL )
         * LIMIT 1
         */
        const user=await this.usersRepository.findOne({
            where:{email},
        });
        console.log('=======>login user findone in db : ' , user , ' /password : ' , password)
        if(!user){
            return null;
        }
        const result = await bcrypt.compare(password, user.password);
        if(result){
            const { password, ...userWithoutPassword } = user;
            console.log('======> auth service userWithout password' , userWithoutPassword)
            return userWithoutPassword;
        }
        return user;
    }
}