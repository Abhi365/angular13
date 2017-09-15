import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

import { Role } from '../../edit-user/edituser.model';
import { Settings } from '../settings/settings.service';


@Injectable()
export class LoggedInUser {
    UserPrincipalId: string;
    UserId: string;
    UserRole: Role;

    constructor(private _http: Http, private _settings: Settings) {
        this.UserPrincipalId = 'FABC50C4-1C53-4C78-B44B-613417CAE017';
        this.getUser();
    }

    getUser() {
        this._http.get(this._settings.getApiUrl() + 'api/users/' + this.UserPrincipalId)
            .subscribe((response) => {
                let user = response.json();
                this.UserRole = new Role(user.RoleId, user.RoleCode, user.RoleDescription, user.Rank);
                this.UserId = user.UserId;
            });
    }

    getRole() {
        return this.UserRole;
    }

    getUserId() {
        return this.UserId;
    }

    getUserPrinicpalId() {
        return this.getUserPrinicpalId;
    }
}