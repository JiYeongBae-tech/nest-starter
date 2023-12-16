import {Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import { Column,
    CreateDateColumn,
    DeleteDateColumn,
} from "typeorm";

@Entity( {schema : 'nestjsrealworld' , name : 'surveyKeyType'})
export class SurveyKeyType{
    @PrimaryColumn(  {type:'varchar' , name :'sktUUID'} )
    sktUUID:string;

    @Column('varchar' , {name:'skUUID'})
    skUUID:string;

    @Column('json' , {name:'sktData'})
    sktData:string;

    @Column('text' , {name:'sktDesc'})
    sktDesc:string;
}