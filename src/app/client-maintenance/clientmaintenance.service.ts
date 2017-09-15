import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { CreateClientHelper } from './clientmaintenance.helper';
import { PartyInfo, PartyDetails, AssociatedCarrier, Account, AssociationStatus } from './clientmaintenance.model';
//import { clientSearchResult, existingClientList, associatedCarriers } from './clientmaintenance.mock.data';
import { Settings } from '../shared/settings/settings.service';

@Injectable()
export class ClientmaintenanceService {
    constructor(private _http: Http, private _settings: Settings) {
    }

    // Search Result on 'Search a company' 
    GetListofSubscription(searchCriteria: string, searchText: string): Observable<Array<PartyInfo>> {
        return this._http.get(this._settings.getApiUrl() + 'api/accounts/parties/' + searchCriteria + '/' + searchText)
            .map((response) => {
                let result: Array<PartyInfo> = new Array<PartyInfo>();
                response.json().forEach((client) => {
                    result.push(CreateClientHelper.mapToPartyInfo(client))
                });
                return result;
            });
    }
    /*// Get Carrier list by Party Id (Import functionality)
    GetCarriersListByPartyId(partyId: number): Observable<Array<AssociatedCarrier>> {
        return this._http.get(this._settings.getApiUrl() + 'api/accounts/carriers/' + partyId)
            .map((response) => {
                let result: Array<AssociatedCarrier> = new Array<AssociatedCarrier>();
                response.json().forEach((client) => {
                    result.push(CreateClientHelper.mapToAssociatedCarrier(client))
                });
                return result;
            })
    }*/
    // Get Carrier List after ' Select Client' 
    // Get Carrier list by Party Id (Import functionality)
    GetAssociatedCarriers(AccountId: string, associationStatus: AssociationStatus): Observable<Array<AssociatedCarrier>> {
        return this._http.get(this._settings.getApiUrl() + 'api/accounts/' + AccountId + '/carriers')
            .map((response) => {
                let result: Array<AssociatedCarrier> = new Array<AssociatedCarrier>();
                response.json().forEach((client) => {
                    result.push(CreateClientHelper.mapToAssociatedCarrier(client, associationStatus));
                });
                return result;
            })
    }
    // Party dropdown
    getPartyDropdown(): Observable<Array<Account>> {
        return this._http.get(this._settings.getApiUrl() + 'api/accounts/active')
            .map((response) => {
                let result: Array<Account> = new Array<Account>();
                response.json().forEach((client) => {
                    result.push(CreateClientHelper.mapToAccount(client))
                });
                return result;
            })
    }
    //Creating Account Service
    createAccount(account: Account) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        //console.log('Create Account');
        // console.log(account);
        return this._http.post(this._settings.getApiUrl() + 'api/accounts',
            JSON.stringify({
                'SubscriptionId': account.SubscriptionId,
                'PartyId': account.PartyId,
                'PartyName': account.PartyName,
                'ConsultancyStatus': account.ConsultancyStatus,
                'AccessLevel': account.AccessLevel,
                'AssociateAllCarriers': account.AssociateAllCarriers,
                'AssociatedCarriers': account.AssociatedCarriers
            }), options).map((response) => response.json());
    }
        
    updateAccount(account: Account) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.put(this._settings.getApiUrl() + 'api/accounts/' + account.Id,
            JSON.stringify({
                'AccountName': account.PartyName,
                'ConsultancyStatus': account.ConsultancyStatus,
                'AccessLevel': account.AccessLevel,
                'AssociateAllCarriers': account.AssociateAllCarriers,
                'AssociatedCarriers': account.AssociatedCarriers
            }), options);
    }

    checkPartyAvailability(PartyId: number) {
        return this._http.get(this._settings.getApiUrl() + 'api/accounts/party/' + PartyId)
            .map((response) => response.json());
    }

}