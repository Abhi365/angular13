import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { RatingAgencyScaleSummaryHelper } from './ratings.helper';
import { RatingAgencyScaleSummary } from './ratings.model';
import { ratingAgencyScaleSummaryResult } from './ratings.mock.data';
import { Settings } from '../shared/settings/settings.service';

@Injectable()
export class RatingAgencyScaleSummaryService {
    constructor(private _http: Http, private _settings: Settings) {
    }

    
    getRatingAgencyScaleSummary(): Observable<Array<RatingAgencyScaleSummary>> {
        return this._http.get(this._settings.getApiUrl() + 'api/rating-agencies/rating-scales')
            .map((response) => this.getRatingAgencyScaleSummaryHandler(response.json()));
    }

    getRatingAgencyScaleSummaryHandler(response) {
        let result: Array<RatingAgencyScaleSummary> = new Array<RatingAgencyScaleSummary>();
        response.forEach((ratingAgencyScaleSummary) => {
            result.push(RatingAgencyScaleSummaryHelper.mapToRatingAgencyScaleSummary(ratingAgencyScaleSummary))
        });
        return result;
    }   
}