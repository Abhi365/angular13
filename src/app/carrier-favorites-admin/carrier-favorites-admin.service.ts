import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { CarrierFavAdminHelper } from './carrier-favorites-admin.helper';
import { CreateFavoriteCategory, UpdateFavoriteCategory, FavoriteCategory, FavoriteGroup, FavoriteType, CarrierFavorite } from './carrier-favorites-admin.model';
import { Settings } from '../shared/settings/settings.service';

@Injectable()
export class CarrierFavAdminService {
    constructor(private _http: Http, private _settings: Settings) {
    }

    GetCategories(): Observable<Array<FavoriteCategory>> {
        return this._http.get(this._settings.getApiUrl() + 'api/favorites/categories')
        .map((response) => {
            let result: Array<FavoriteCategory> = new Array<FavoriteCategory>();
            response.json().forEach((category) => {
                result.push(CarrierFavAdminHelper.mapToCategoryInfo(category))
            });
            return result;
        });
    }
    GetCarrierFavoritesByGroupId(groupId : string):Observable<Array<CarrierFavorite>> {
        return this._http.get(this._settings.getApiUrl() + 'api/favorites/groups/'+groupId+'/carrier-favorites')
        .map((response) => {
            let result: Array<CarrierFavorite> = new Array<CarrierFavorite>();
            response.json().forEach((carrier) => {
                result.push(CarrierFavAdminHelper.mapToCarrierInfo(carrier))
            });
            return result;
        });
    }
    GetGroups(): Observable<Array<FavoriteGroup>> {
        return this._http.get(this._settings.getApiUrl() + 'api/favorites/groups')
        .map((response) => {
            let result: Array<FavoriteGroup> = new Array<FavoriteGroup>();
            response.json().forEach((group) => {
                result.push(CarrierFavAdminHelper.mapToGroupInfo(group))
            });
            return result;
        });
    }

    PostFavoriteCategory(categoryName, categoryType, clientId) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._settings.getApiUrl() + 'api/favorites/categories',
            JSON.stringify({
                'CategoryName': categoryName,
                'CategoryType': categoryType,
                'ClientId': clientId
            }), options).map((response) => response.json());
    }

    PutFavoriteCategory(categoryId, categoryType) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.put(this._settings.getApiUrl() + 'api/favorites/categories/' + categoryId,
            JSON.stringify({
                'CategoryId': categoryId,
                'CategoryType': categoryType
            }), options).map((response) => response.json());
    }

    DeleteFavoriteCategory(groupId: string) {
        return this._http.delete(this._settings.getApiUrl() + 'api/favorites/categories/' + groupId);
    }
    DeleteFavoriteCategoryboth(groupId: string, categoryId: string) {
        return this._http.delete(this._settings.getApiUrl() + 'api/favorites/groups/'+groupId+'/category/'+categoryId);
    }

    PostFavoriteGroup(groupName, groupType, clientId) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._settings.getApiUrl() + 'api/favorites/groups',
            JSON.stringify({
                'GroupName': groupName,
                'GroupType': groupType,
                'ClientId': clientId
            }), options).map((response) => response.json());
    }
    PutFavoriteGroup(groupId, groupType) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.put(this._settings.getApiUrl() + 'api/favorites/groups/' + groupId,
            JSON.stringify({
                'GroupId': groupId,
                'GroupType': groupType
            }), options);
    }
}