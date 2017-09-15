import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Settings } from '../shared/settings/settings.service';
import { EditUserHelper } from './edituser.helper';
import { UserDetails, Role, Account, AccountActionIndicator } from './edituser.model';


@Injectable()
export class EditUserService {
    constructor(private _http: Http, private _settings: Settings) {
    }

    getUserSearchResult(searchText: string, userType: number): Observable<Array<UserDetails>> {
        return this._http.get(this._settings.getApiUrl() + 'api/users/' + userType + '/' + searchText)
            .map((response) => this.getUserSearchResultHandler(response.json()));
    }

    getUserSearchResultHandler(response) {
        let result: Array<UserDetails> = new Array<UserDetails>();
        response.forEach((user) => {
            result.push(EditUserHelper.mapToUserDetails(user))
        });
        return result;
    }

    getRoles(): Observable<Array<Role>> {
        return this._http.get(this._settings.getApiUrl() + 'api/roles')
            .map((response) => this.getRolesHandler(response.json()));
    }

    getRolesHandler(response) {
        let result: Array<Role> = new Array<Role>();
        response.forEach((role) => {
            result.push(EditUserHelper.mapToRole(role));
        });
        return result;
    }

    getAccounts(): Observable<Array<Account>> {
        return this._http.get(this._settings.getApiUrl() + 'api/accounts/active')
            .map((response) => this.getAccountsHandler(response.json()));
    }

    getAccountsHandler(response) {
        let result: Array<Account> = new Array<Account>();
        response.forEach(account => {
            result.push(EditUserHelper.mapToAccount(account, AccountActionIndicator.Remove));
        });
        return result;
    }

    getUser(userDetails: UserDetails): Observable<UserDetails> {
        return this._http.get(this._settings.getApiUrl() + 'api/users/' + userDetails.PrincipleId)
            .map((response) => this.getUserHandler(response.json(), userDetails));
    }

    getUserHandler(response, userDetails) {
        if (response !== null) {
            let user = response;
            userDetails.setUserRole(new Role(user.RoleId, user.RoleCode, user.RoleDescription, user.Rank));
            userDetails.setUserId(user.UserId);
        } else {
            userDetails.setUserRole(new Role('', '', '', 0));
        }
        return userDetails;
    }

    getAccountsForUser(userDetails: UserDetails): Observable<UserDetails> {
        return this._http.get(this._settings.getApiUrl() + 'api/users/' + userDetails.UserId + '/accounts')
            .map((response) => this.getAccountsForUserHandler(response.json(), userDetails));
    }

    getAccountsForUserHandler(response, userDetails) {
        let result: Array<Account> = new Array<Account>();
        response.forEach(account => {
            result.push(EditUserHelper.mapToAccount(account, AccountActionIndicator.None));
        });
        userDetails.AccountList = result;
        return userDetails;
    }

    createUser(userDetails: UserDetails) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._settings.getApiUrl() + 'api/users',
            JSON.stringify({
                'UserPrincipalId': userDetails.PrincipleId,
                'RoleId': userDetails.UserRole.RoleId,
                'Accounts': userDetails.AccountList
            }), options).map((response) => response.json());
    }

    updateUser(userDetails: UserDetails) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.put(this._settings.getApiUrl() + 'api/users/' + userDetails.PrincipleId,
            JSON.stringify({
                'UserId': userDetails.UserId,
                'RoleId': userDetails.UserRole.RoleId,
                'Accounts': userDetails.AccountList
            }), options).map((response) => response.json());
    }
}
