import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { DisclaimersHelper } from './disclaimers.helper';
import { RatingAgency, RatingAgencyDisclaimer, WTWDisclaimer } from './disclaimers.model';
import { ratingAgencyDropdown } from './disclaimers.mock.data';
import { Settings } from '../shared/settings/settings.service';


@Injectable()
export class DisclaimersService {
    constructor(private _http: Http, private _settings: Settings) { }

    GetRatingAgencies(): Observable<Array<RatingAgency>> {
        return this._http.get(this._settings.getApiUrl() + 'api/rating-agencies').map((response) => {
            let result: Array<RatingAgency> = new Array<RatingAgency>();
            response.json().forEach((agency) => {
                result.push(DisclaimersHelper.mapToAgencyInfo(agency))
            });
            return result;
        });
    }

    GetDisclaimerByRatingAgencyId(RatingAgencyId: number): Observable<RatingAgencyDisclaimer> {
        return this._http.get(this._settings.getApiUrl() + 'api/rating-agencies/' + RatingAgencyId + '/disclaimers/')
            .map((response) => {
                let result: RatingAgencyDisclaimer;
                result = response.json();
                return result;
            })
    }

    GetDisclaimer(): Observable<WTWDisclaimer> {
        return this._http.get(this._settings.getApiUrl() + 'api/accounts/disclaimer')
            .map((response) => {
                let result: WTWDisclaimer;
                result = DisclaimersHelper.mapToWTWDisclaimer(response.json());
                return result;
            })
    }

    PostDisclaimer(RatingAgencyId: number, disclaimer: string, IsHidden: boolean) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._settings.getApiUrl() + 'api/rating-agencies/'
            + RatingAgencyId + '/disclaimers',
            JSON.stringify({
                'DisclaimerText': disclaimer,
                'IsHidden': IsHidden
            }), options).map((response) => response.json());
    }

    PutDisclaimer(Id: number, RatingAgencyId: number, disclaimer: string, IsHidden: boolean) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        if (RatingAgencyId != 0) {
            return this._http.put(this._settings.getApiUrl() + 'api/rating-agencies/' + RatingAgencyId + '/disclaimers/' + Id,
                JSON.stringify({
                    'DisclaimerText': disclaimer,
                    'IsHidden': IsHidden
                }), options).map((response) => response.json());

        } else {
            return this._http.put(this._settings.getApiUrl() + 'api/accounts/disclaimer',
                JSON.stringify({
                    'DisclaimerText': disclaimer,
                    'IsHidden': IsHidden
                }), options).map((response) => response.json());

        }

    }

}
