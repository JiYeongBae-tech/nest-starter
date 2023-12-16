import {Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import { Column,
    CreateDateColumn,
    DeleteDateColumn,
} from "typeorm";

@Entity( {schema : 'nestjsrealworld' , name : 'surveyKey'})
export class SurveyKey{
    @PrimaryColumn(  {type:'varchar' , name :'skUUID'} )
    skUUID:string;

    @Column('varchar' , {name:'skKeyName'})
    skKeyName:string;

    @Column('varchar' , {name:'skKey'})
    skKey:string;

    @Column('text' , {name:'skKeyDesc'})
    skKeyDesc:string;
}