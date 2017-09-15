import { Injectable, Injector } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../../environments/environment';

@Injectable()
export class Settings {
    private apiUrl: string;
    private reportsUrl: string;
    private summaryUrl: string;
    private formAMGraphUrl : string;
    private formSnPGraphUrl : string;
    private _http: Http;
    constructor(private _injector: Injector) {
        this._http = this._injector.get(Http);
    }

    getSettings(): Promise<boolean> {
        // call API Contoller
        return new Promise<boolean>((resolve, reject) => {
            if (environment.production) {
                this._http.get('api/configs')
                    .map((result) => result.json())
                    .subscribe((result) => {
                        // console.log("Reports result Api call :");
                        // console.log(result);
                        this.apiUrl = result.WebApiUrl;
                        this.reportsUrl = result.ReportUrl;
                        this.summaryUrl = result.ReportUrl;
                        this.formSnPGraphUrl = result.ReportUrl;
                        this.formAMGraphUrl = result.ReportUrl;
                        resolve(true);
                    }, (error) => {
                        reject(true);
                    })

            } else {
                this.getDevSettings();
                resolve(true);
            }
        });
    }
    getApiUrl(): string {
        return this.apiUrl;
    }

    getReportsUrl() {
        return this.reportsUrl;
    }
    getSummaryUrl() {
        return this.summaryUrl;
    }
    getFormAMGraphUrl(){
        return this.formAMGraphUrl;

    }
    getFormSnPGraphUrl(){
        return this.formSnPGraphUrl;

    }

    getDevSettings() {
        this.apiUrl = (<any>window).apiUrl;
        this.reportsUrl = (<any>window).reportsUrl;
        this.summaryUrl = (<any>window).summaryUrl;
        this.formAMGraphUrl = (<any>window).formAMGraphUrl;
        this.formSnPGraphUrl = (<any>window).formSnPGraphUrl;

    }
}


export function SettingsFactory(settings: Settings) {
    return () => settings.getSettings();
}
