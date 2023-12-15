// ./src/entities/Post.ts

import { Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { User } from "./User";



@Entity({ schema: 'example1', name: 'posts' })
export class Post {
    @PrimaryGeneratedColumn({type:'int',name:'id'})
    id:number;

    @Column('varchar', {name:'title', length:30})
    title:string;

    @Column('varchar', {name:'contents', length:100})
    contents:string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @Column('int', { name: 'UserId', nullable: false })
    UserId: number | null;

    /** 관계 설정하는 영역 */
    //한명의 유저가 여거 포스트를 작성할수있으니 many to one
    @ManyToOne(()=>User,(users)=>users.id,{
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    })
    //OneToMany 또는 ManyToOne중 아무 곳에나 작성하면 되는데 주로 ForeignKey가 있는 곳에 작성한다.
    //Posts에 userID가 포함되어야 하기에 Posts에 붙여주었다.
    @JoinColumn([{ name: 'postUserId', referencedColumnName: 'id' }])
    PostUserId: User;

    //ManyToMany(다대다) 관계도 사용할 수 있다.
    //
    // 위 사용법과 같이 양 엔티티 코드 쪽에 ManyToMany를 해준다. 사용법은 같지만 차이점이 하나 있다.
    //
    // 이 경우는 JoinColumn이 아닌 JoinTable을 작성해준다.
    //
    // @JoinTable()을 이용해 사용하고, 테이블명, 조인컬럼 등을 지정해준다.
    //
    // 자세한 내용은 아래 링크를 확인해보자.
    //  https://typeorm.io/#/many-to-many-relations
}