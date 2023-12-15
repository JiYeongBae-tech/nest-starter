// ./src/entities/User.ts

import { Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Post } from "./Post";


/** baej schema : mysql database 명 . nams : mysql table 명 */
@Entity({ schema: 'nestjsrealworld', name: 'UsersT' } )
export class User {
    /** pk 칼럼  */
    @PrimaryGeneratedColumn({type:'int',name:'id'})
    id:number;

    /** name : 칼럼명 ,  */
    @Column('varchar', {name:'email', unique:true ,length:30})
    email:string; /** => email : 타입스크립트 코드 상 부르는 변수명  */

    @Column('varchar',{name:'name', length:20})
    name:string;

    @Column('int',{name:'age'})
    age:number;

    @Column('varchar',{name:'password', length:70})
    password:string;

    /** 언제생성되었는지의 칼럼 생성  */
    @CreateDateColumn()
    createdAt: Date;
    /** 언제업뎃되었는지의 칼럼 생성  */
    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

    /** 관계설정해주는 영역
    // 하나의 유저가 여러 포스트를 작성 할 수 있을테니 Posts와 OneToMany를 설정한다
    @OneToMany(
        ()=>Post,
        (posts)=>posts.UserId
    )

    //OwnedUserPosts라는 속성을 추가한 뒤 관계설정을 Posts와 하게 하는 코드이다
    OwnedUserPosts:Post[]
*/
}