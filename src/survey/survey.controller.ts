import {Body, Controller, Logger, Post} from '@nestjs/common';
import {SurveyService} from "./survey.service";

export interface MyTypeIf{
    'TypeList':  any ,
    'TypeUnit':  any ,
    'Template':  any ,
}

@Controller('survey')
export class SurveyController {
    constructor(private SurveyService:SurveyService ){}


    @Post("getSurveyData")
    async getSurveyData(@Body() body){
        return await this.SurveyService.findAllT()
    }

    @Post("getCoupon")
    async getCoupon(@Body() body){
        return await this.SurveyService.getCoups()
    }

    @Post("test")
    async test(@Body() body){
        return await this.SurveyService.test()
    }

}