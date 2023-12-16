import {Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import { Column,
    CreateDateColumn,
    DeleteDateColumn,
    OneToMany,
    UpdateDateColumn
} from "typeorm";

@Entity( {schema : 'nestjsrealworld' , name : 'surveyKeyTypeUnit'})
export class SurveyKeyTypeUnit{
    @PrimaryColumn(  {type:'varchar' , name :'sktuUUID'} )
    sktuUUID:string;

    @Column('varchar' , {name:'sktuKeyName'})
    sktuKeyName:string;

    @Column('varchar' , {name:'sktuKey'})
    sktuKey:string;

    @Column('text' , {name:'sktuKeyDesc'})
    sktuKeyDesc:string;
}