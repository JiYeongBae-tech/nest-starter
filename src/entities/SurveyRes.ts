import {Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import { Column,
    CreateDateColumn,
    DeleteDateColumn,
    OneToMany,
    UpdateDateColumn
} from "typeorm";

@Entity( {schema : 'nestjsrealworld' , name : 'surveyRes'})
export class surveyRes{
    @PrimaryColumn(  {type:'varchar' , name :'srUUID'} )
    srUUID:string;

    @Column('varchar' , {name:'stUUID'})
    stUUID:string;

    @Column('varchar' , {name:'userUUID'})
    userUUID:string;

    @Column('json' , {name:'srData'})
    srData:string;

}