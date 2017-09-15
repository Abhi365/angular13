import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {HomePageHelper } from './home.helper';
import {Entities,EntityAttributes,EntityAttributeValues} from './home.model';

import {Settings } from '../shared/settings/settings.service';

@Injectable()
export class HomePageService {
    constructor(private _http: Http, private _settings: Settings) {
    }

    
   

     gethomepageadminText(): Observable<EntityAttributeValues> {
        return this._http.get(this._settings.getApiUrl() + 'api/contents/home-page-text')
            .map((response) => this.gethomepageadminTextHandler(response));

    }

    gethomepageadminTextHandler(response) {
        return HomePageHelper.mapToEntityAttributeValue(response);
       
    }
    
    
}
    