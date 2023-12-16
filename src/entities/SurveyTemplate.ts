import {Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import { Column,
    CreateDateColumn,
    DeleteDateColumn,
} from "typeorm";

@Entity( {schema : 'nestjsrealworld' , name : 'surveyTemplate'})
export class SurveyTemplate{

    @PrimaryColumn(  {type:'varchar' , name :'stUUID'} )
    stUUID:string;

    @Column('json' , {name:'stData'})
    stData:string;

}

