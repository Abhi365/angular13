import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Settings } from '../shared/settings/settings.service';
import { SelectClientHelper } from './select-client.helper';
import { Account } from './select-client.model';

@Injectable()
export class SelectClientService {

    constructor(private _http: Http, private _settings: Settings) { }

    getAccounts(): Observable<Array<Account>> {
        return this._http.get(this._settings.getApiUrl() + 'api/accounts/active')
            .map((response) => this.getAccountsHandler(response.json()));
    }

    getAccountsHandler(response) {
        let result: Array<Account> = new Array<Account>();
        response.forEach(account => {
            result.push(SelectClientHelper.mapToAccount(account));
        });
        return result;
    }

}