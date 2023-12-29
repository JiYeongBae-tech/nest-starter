import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {SurveyKeyType} from "../entities/SurveyKeyType";
import {SurveyKey} from "../entities/SurveyKey";
import {SurveyKeyTypeUnit} from "../entities/SurveyKeyTypeUnit";
import {SurveyTemplate} from "../entities/SurveyTemplate";
import {CommonHelper} from "../common/helper/commonHelper";
import {HttpService} from "@nestjs/axios";
import {map, Observable} from 'rxjs';
import { AxiosResponse } from 'axios';
import {response} from "express";
import {MyTypeIf} from "./survey.controller"
@Injectable()
export class SurveyService {
    constructor(
        /** InjectRepository 데코레이터는
         * NestJS에서 TypeORM을 사용할 때, 서비스나 컨트롤러 등에서 TypeORM Repository를 주입받기 위해 사용됩니다.*/
        @InjectRepository(SurveyKey)
        private readonly skRepo: Repository<SurveyKey>,
        @InjectRepository(SurveyKeyTypeUnit)
        private readonly sktuRepo : Repository<SurveyKeyTypeUnit>,
        @InjectRepository(SurveyTemplate)
        private readonly stRepo : Repository<SurveyTemplate>,

        private readonly commonHelper : CommonHelper,
        private readonly httpService : HttpService,
) {}

    /** survey get all data */
    async findAllT() : Promise< MyTypeIf >{
        const resultPromise = [
            this.skRepo.find(),
            this.sktuRepo.find(),
            this.stRepo.find(),
        ]
        const [  skRes, sktuRes, stRes ] =await Promise.all(resultPromise);


        const typeList = this.commonHelper.DictByKeyList(skRes, 'skUUID'); // 타입 리스트 (단답 장문 등)
        const typeUnit = this.commonHelper.DictByKeyList(sktuRes, 'sktuUUID'); //타입 단위 (문장길이 응답개수 필수값 등)
        const template = this.commonHelper.DictByKeyList(stRes, 'stUUID'); //템플릿 json

        const results = {
            'TypeList':  typeList ,
            'TypeUnit':  typeUnit ,
            'Template':  template
        };

        // 프론트엔드에서 설문폼 UI , 조건체크 로직을 구현한다고 가정합니다.

        // 선택한 설문폼 json
        const tempJson = results['Template']['485a4584-0d7b-4ea7-9cd4-e81ea7a34076'];
        //첫번째 질문 타입
        const QtypeId1 = tempJson['stData']['data'][0]['skUUID']; //질문 타입 uuid
        const Qtype1 = results['TypeList'][QtypeId1]['skKeyName'] // 질문 타입 ( 단답형)
        //첫번째 질문 상세 옵션
        const QoptionArr = tempJson['stData']['data'][0]['options']; //질문 옵션 uuid

        Object.entries(QoptionArr).reduce(
            (accumulator, [key, value]) => {
                const unitEngKey= typeUnit[key]['sktuKey']

                switch (unitEngKey){
                    case 'move' :
                        //클릭 이벤트 리스너 생성
                        /** value :
                         * {
                            "moveQIdx": 2,
                            "choiceIdx": 1
                            }*/
                        break;
                    case 'requirement' :
                        //필수값. 무조건 선택해야하는 질문
                        /** true */
                        break;
                    case 'answerCnt' :
                        //응답 개수 min , max 리스너 생성
                        /** value :
                         * {
                            "min": 5,
                            "max": 15
                            }*/
                    //....
                    default :
                        break;
                }
                return accumulator;
            }, []);

        /**
         *  {
         *   '2a2f5eab-5504-4b8b-a6e2-648ff07802bc': { max: null, min: 1 },
         *   '87ab1884-9118-49d3-a10a-27a9f5107110': { max: 10, min: 1 }
         * }
         */

        //form 제출직전 체크


        return {
            'Template':  template,
            'TypeList':  typeList ,
            'TypeUnit':  typeUnit
        };
    }

    getCoups() : Observable<AxiosResponse<any[]>> {
        return this.httpService.get('http://3.36.241.154/bar/').pipe(
            map(response => response.data)
        );
    }

    test()  {
        return 'test';
    }
}
