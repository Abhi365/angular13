import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

//import { environment } from '../../environments/environment';
import {TermsOfUseHelper } from './terms-of-use.helper';

import {TermsOfUse} from './terms-of-use.model';
import {TermsOfUseResult } from './terms-of-use.mock.data';
import {Settings } from '../shared/settings/settings.service';

@Injectable()
export class TermsOfUseService {
    constructor(private _http: Http, private _settings: Settings) {
    }

    
    getalltermsofuse(): Observable<Array<TermsOfUse>> {
        return this._http.get(this._settings.getApiUrl() + 'api/users/terms-of-use')
            .map((response) => this.getalltermsofuseHandler(response.json()));
    }

    getalltermsofuseHandler(response) {
        
        let result: Array<TermsOfUse> = new Array<TermsOfUse>();
        response.forEach((termsOfUse) => {
            result.push(TermsOfUseHelper.mapToTermsOfUse(termsOfUse))
        });
        return result;
    }

    gettermsofuseByVersion(version: number): Observable<TermsOfUse> {
        return this._http.get(this._settings.getApiUrl() + 'api/users/terms-of-use/version/' + version)
            .map((response) => this.gettermsofuseByVersionHandler(response.json()));
    }

    gettermsofuseByVersionHandler(response) {
       
        return TermsOfUseHelper.mapToTermsOfUse(response);
       
        
    }

    gettermsofuseByCurrentVersion():Observable<TermsOfUse> {
        return this._http.get(this._settings.getApiUrl() + 'api/users/terms-of-use/version/current')
            .map((response) => this.gettermsofuseByCurrentVersionHandler(response.json()));
    }

    gettermsofuseByCurrentVersionHandler(response) {
        return TermsOfUseHelper.mapToTermsOfUse(response);
      
    }

    
    CreateTermsOfUseText(TermsOfUseText: string,currentversionId:number) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        
        return this._http.post(this._settings.getApiUrl() + 'api/users/terms-of-use/',
            JSON.stringify({
                'TermsOfUseText': TermsOfUseText,
                'Version':currentversionId
            }), options).map((response) => response.json());
    }
    
    UpdateTermsOfUseText(TermsOfUseText: string,currentversionId: number) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.put(this._settings.getApiUrl() + 'api/users/terms-of-use/' + currentversionId,
            JSON.stringify({
                'TermsOfUseText': TermsOfUseText,
                'Version':currentversionId
            }), options);
    }
}
    