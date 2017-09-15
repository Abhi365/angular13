import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { carrierGeneralInfo, carrierContactDetails, carrierMainEntity, carrierApprovalStatus, carrierRatingSummary, carrierApprovalStatusAuditTrail, carrierRatingAuditTrail, willisShortNames } from './general.model';
import { Settings } from '../../shared/settings/settings.service';
import { GeneralHelper } from './general.helper';

@Injectable()

export class GeneralService {
    constructor(private _http: Http, private _settings: Settings) { }

    GetCarrierGeneralInfo(companycode: string, year: number): Observable<carrierGeneralInfo> {
        return this._http.get(this._settings.getApiUrl() + 'api/carriers/' + companycode + '/general/year/' + year)
            .map((response) => {
                let detailsResult: carrierGeneralInfo;
                detailsResult = response.json();
                return detailsResult;
            })
    }

    // GetCarrierApprovalStatusByCarrierId(carrierid: number): Observable<Array<carrierApprovalStatusAuditTrail>> {
    //     return this._http.get(this._settings.getApiUrl() + 'api/carriers/' + carrierid + '/audit-trail/approvalstatus').map((response) => {
    //         let result: Array<carrierApprovalStatusAuditTrail> = new Array<carrierApprovalStatusAuditTrail>();
    //         response.json().forEach((auditTrail) => {
    //             result.push(GeneralHelper.mapToAuditTrailInfo(auditTrail))
    //         });
    //         return result;
    //     });
    // }
    GetCarrierRatingSummary(carrierid: number, ratingagencyid: number): Observable<Array<carrierRatingAuditTrail>> {
        return this._http.get(this._settings.getApiUrl() + 'api/carriers/' + carrierid + '/audit-trail/rating-agency/' + ratingagencyid)
        .map((response) => {
            let result: Array<carrierRatingAuditTrail> = new Array<carrierRatingAuditTrail>();
            let yy = response.json().carrierRatingAuditTrail;
            let xx = JSON.stringify(yy);
            
            JSON.parse(xx).forEach((ratingTrail) => {
                //response.json().forEach((ratingTrail) => {
                result.push(GeneralHelper.mapToRatingTrail(ratingTrail))
            });
            console.log("RatingSummary:"+result);
            return result;
        });
    }
    // GetWillisShortNames(carrierid:  number):  Observable<Array<willisShortNames>> {
    //     return  this._http.get(this._settings.getApiUrl()  +  'api/carriers/' + carrierid + '/shortname')
    //         .map((response)  =>  {
    //             let  result:  Array<willisShortNames>  =  new  Array<willisShortNames>();
    //             response.json().forEach((willis)  =>  {
    //                 result.push(GeneralHelper.mapToWillisInfo(willis))
    //             });
    //             return  result;
    //         });
    // }
    GetCarrierApprovalStatusByCarrierId(carrierid: number): Observable<carrierApprovalStatusAuditTrail> {
        return this._http.get(this._settings.getApiUrl() + 'api/carriers/' + carrierid + '/audit-trail/approvalstatus')
        .map((response) => {
            let result : carrierApprovalStatusAuditTrail;
                result = GeneralHelper.mapToAuditTrailInfo(response.json());
            return result;
        });
    }
    // GetCarrierRatingSummary(carrierid: number, ratingagencyid: number): Observable<carrierRatingAuditTrail> {
    //     return this._http.get(this._settings.getApiUrl() + 'api/carriers/' + carrierid + '/audit-trail/rating-agency/' + ratingagencyid)
    //         .map((response) => {
    //             let result: carrierRatingAuditTrail;
    //             result = GeneralHelper.mapToRatingTrail(response.json());
    //             return result;
    //         });
    // }

    GetWillisShortNames(carrierid: number): Observable<willisShortNames> {
        return this._http.get(this._settings.getApiUrl() + 'api/carriers/' + carrierid + '/shortname')
            .map((response) => {
                let result : willisShortNames;
                result = GeneralHelper.mapToWillisInfo(response.json());
                return result;
            });
    }
}