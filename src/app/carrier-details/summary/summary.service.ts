import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { ReferenceCode, CreateReferenceCode } from './summary.model';
import { Settings } from '../../shared/settings/settings.service';
import { SummaryHelper } from './summary.helper';

@Injectable()

export class SummaryService {
    constructor(private _http: Http, private _settings: Settings) { }


    GetReferenceCodeByAccountIdAndCarrierId(accountId: string, carrierId: number): Observable<ReferenceCode> {
        return this._http.get(this._settings.getApiUrl() + 'api/accounts/' + accountId + '/carrier/' + carrierId + '/reference-codes')
            .map((response) => {
                let refResult: ReferenceCode;
                refResult = SummaryHelper.mapToReferenceCode(response.json());
                return refResult;
            })
    }
    PostReferenceCode(accountId: string, carrierId: number, createReferenceCode: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._settings.getApiUrl() + 'api/accounts/' + accountId + '/carrier/' + carrierId + '/reference-codes',
            JSON.stringify({
                'Code': createReferenceCode
            }), options).map((response) => response.json());
    }

}