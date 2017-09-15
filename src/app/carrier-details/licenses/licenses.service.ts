import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { licenseBusinessType, licenseState } from './licenses.model';
import { Settings } from '../../shared/settings/settings.service';
import { LicensesHelper } from './licenses.helper';

@Injectable()

export class LicensesService {
    constructor(private _http: Http, private _settings: Settings) { }

    // GetLicenseTypes(carrierId: number, countryCode: string): Observable<licenseBusinessType> {
    //     return this._http.get(this._settings.getApiUrl() + 'api/carriers/' + carrierId + '/licenses/country/' + countryCode + '/types')
    //         .map((response) => {
    //             let licenseResult: licenseBusinessType;
    //             licenseResult = LicensesHelper.mapToLicenseType(response.json());
    //             return licenseResult;
    //         })
    // }
    // GetLicenseGrades(carrierId: number, countryCode: string): Observable<licenseState> {
    //     return this._http.get(this._settings.getApiUrl() + 'api/carriers/' + carrierId + '/licenses/country/' + countryCode + '/grades')
    //         .map((response) => {
    //             let licenseGradeResult: licenseState;
    //             licenseGradeResult = LicensesHelper.mapToLicenseGradeDetails(response.json());
    //             return licenseGradeResult;
    //         })
    // }
   

    GetLicenseTypes(carrierId: number, countryCode: string ): Observable<Array<licenseBusinessType>> {
        return this._http.get(this._settings.getApiUrl() + 'api/carriers/'+carrierId+'/licenses/country/'+countryCode+'/types')
        .map((response) => {
            let licenseResult: Array<licenseBusinessType> = new Array<licenseBusinessType>();
            response.json().forEach((licenses) => {
                licenseResult.push(LicensesHelper.mapToLicenseType(licenses))
            });
            console.log(this._settings.getApiUrl() + 'api/carriers/'+carrierId+'/licenses/country/'+countryCode+'/types');
            return licenseResult;  
        });
    }
    


    GetLicenseGrades(carrierId: number, countryCode: string ): Observable<Array<licenseState>> {
        return this._http.get(this._settings.getApiUrl() + 'api/carriers/'+carrierId+'/licenses/country/'+countryCode+'/grades')
        .map((response) => {
            let licenseStateResult: Array<licenseState> = new Array<licenseState>();
            response.json().forEach((licensesGrade) => {
                licenseStateResult.push(LicensesHelper.mapToLicenseGradeDetails(licensesGrade))
            });
            return licenseStateResult;
        });
    }
}