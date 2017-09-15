import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {HomePageAdminHelper } from './home-page-admin.helper';
import {Entities,EntityAttributes,EntityAttributeValues} from './home-page-admin.model';

import {Settings } from '../shared/settings/settings.service';

@Injectable()
export class HomePageAdminService {
    constructor(private _http: Http, private _settings: Settings) {
    }

    
   

    gethomepageadminText(): Observable<EntityAttributeValues> {
        return this._http.get(this._settings.getApiUrl() + 'api/contents/home-page-text')
            .map((response) => this.gethomepageadminTextHandler(response));

    }

    gethomepageadminTextHandler(response) {
        return HomePageAdminHelper.mapToEntityAttributeValue(response);
           
    }

    
    
    UpdateHomepageadminText(homepageadminText: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.put(this._settings.getApiUrl() + 'api/contents/home-page-text' ,
            JSON.stringify({
                'HomePageText': homepageadminText
            }), options);
    }
}
    