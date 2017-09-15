import { Injectable } from '@angular/core';

import { Settings } from '../shared/settings/settings.service';
import { ClientService } from '../select-client/client.service';

@Injectable()
export class CarrierDetailsService {
    reportUrl: string;
    summaryUrl: string;
    formAMGraphUrl: string;
    formSnPGraphUrl: string;
     formAMGraphUrl2: string;
    formSnPGraphUrl2: string;
    value: number;
    param1: number;
    param2: number;
    HideTablix: number;
    pdfUrl : string;
    excelUrl : string;

    constructor(private _settings: Settings, private _clientService: ClientService) {
        this.param1 = 1;
        this.param2 = 1;
        // get first carrier
        if (this._clientService.getCarriers() !== undefined) {
            this.reportUrl = this._settings.getReportsUrl() + 'reports/carrier/' +
                this._clientService.getCarriers()[0].WillisCode + '/params/currentYear=' +
                new Date().getFullYear() + '|companyCode=' + this._clientService.getCarriers()[0].WillisCode
                + '|reportType=';

                this.pdfUrl = this._settings.getReportsUrl() + 'reports/carrier/' +
                this._clientService.getCarriers()[0].WillisCode + '/params/currentYear=' +
                new Date().getFullYear() + '|companyCode=' + this._clientService.getCarriers()[0].WillisCode
                + '|reportType=Financials|reportSubType=Combined|exportReport=true|exportFormat=pdf';

                this.excelUrl = this._settings.getReportsUrl() + 'reports/carrier/' +
                this._clientService.getCarriers()[0].WillisCode + '/params/currentYear=' +
                new Date().getFullYear() + '|companyCode=' + this._clientService.getCarriers()[0].WillisCode
                + '|reportType=Financials|reportSubType=Combined|exportReport=true|exportFormat=excel';

            // this.summaryUrl = this._settings.getSummaryUrl() + 'reports/carrier/B3985/params/CurrentYear=2013%7CCompanyCode=B3985%7CReportType=Summary%7CReportSubType=Summary%7CURLToSearch=%7CShowlkbtSupplementary=false';

            this.summaryUrl = this._settings.getSummaryUrl() + 'reports/carrier/' +
                this._clientService.getCarriers()[0].WillisCode + '/params/currentYear=' +
                new Date().getFullYear() + '|companyCode=' + this._clientService.getCarriers()[0].WillisCode
                + '|reportType=Summary' + '|reportSubType=Summary' + '|URLToSearch=www~google~com' + '|showlkbtSupplementary=false';

            this.formAMGraphUrl = this._settings.getFormAMGraphUrl() + 'reports/carrier/' +
                this._clientService.getCarriers()[0].WillisCode + '/params/currentYear=' +
                new Date().getFullYear() + '|companyCode=' + this._clientService.getCarriers()[0].WillisCode
                + '|reportType=Summary' + '|reportSubType=Summary' + '|hideChart=3' + '|hideTablix=' + this.getDataforAM() + '|reportNumber=12';

            this.formSnPGraphUrl = this._settings.getFormSnPGraphUrl() + 'reports/carrier/' +
                this._clientService.getCarriers()[0].WillisCode + '/params/currentYear=' +
                new Date().getFullYear() + '|companyCode=' + this._clientService.getCarriers()[0].WillisCode
                + '|reportType=Summary' + '|reportSubType=Summary' + '|hideChart=3' + '|hideTablix=' + this.setDataforSnP(this.value) + '|reportNumber=13';
            
            this.formAMGraphUrl2 = this._settings.getFormAMGraphUrl() + 'reports/carrier/' +
                this._clientService.getCarriers()[0].WillisCode + '/params/currentYear=' +
                new Date().getFullYear() + '|companyCode=' + this._clientService.getCarriers()[0].WillisCode
                + '|reportType=Summary' + '|reportSubType=Summary' + '|hideChart=3' + '|hideTablix=0'+'|reportNumber=12';

            this.formSnPGraphUrl2 = this._settings.getFormSnPGraphUrl() + 'reports/carrier/' +
                this._clientService.getCarriers()[0].WillisCode + '/params/currentYear=' +
                new Date().getFullYear() + '|companyCode=' + this._clientService.getCarriers()[0].WillisCode
                + '|reportType=Summary' + '|reportSubType=Summary' + '|hideChart=3' + '|hideTablix=0'+'|reportNumber=13';
                // console.log(this.reportUrl);
            //console.log(this.pdfUrl);
        }
    }

    getReportUrl() {
        return this.reportUrl;
    }
    getPdfUrl() {
        return this.pdfUrl;
    }
    getExcelUrl() {
        return this.excelUrl;
    }

    getSummaryUrl() {
        return this.summaryUrl;
    }

    getFormAMGraphUrl(HideTablix) {
        this.setDataforAM(HideTablix);
        return this.formAMGraphUrl;
    }
    getFormSnPGraphUrl(HideTablix) {
        this.setDataforSnP(HideTablix);
        return this.formSnPGraphUrl;
    }
        getFormAMGraphUrl2(HideTablix) {
        return this.formAMGraphUrl2;
    }
    getFormSnPGraphUrl2(HideTablix) {
        return this.formSnPGraphUrl2;
    }
    getDataforAM() {
        return this.param1;
    }

    setDataforAM(param1) {
        this.param1 = 0;
    }
    setDataforSnP(param2) {
        return this.param2;
    }
}