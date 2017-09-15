import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { Settings } from '../../shared/settings/settings.service';

@Injectable()
export class FinacialService {
    constructor(private _http: Http, private _settings: Settings) { }

    GetDisclaimer(): Observable<string> {
        return this._http.get(this._settings.getApiUrl() + 'api/accounts/disclaimer')
            .map((response) => response.json().DisclaimerText);
    }
}