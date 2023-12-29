import { Module } from '@nestjs/common';
import {HttpModule, HttpService} from "@nestjs/axios";
import {SurveyService} from "./survey.service";

@Module({
    imports: [HttpModule],
    // providers : [SurveyService]
})
export class SurveyModule {
}
