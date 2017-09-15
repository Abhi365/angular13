import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

//import { environment } from '../../environments/environment';
import { AnnouncementsHelper } from './announcements.helper';

import { Announcement, Account, AnnouncementClient, AnnouncementDocumentLink } from './announcements.model';
import { annoucementsSearchResult } from './announcements.mock.data';
import { Settings } from '../shared/settings/settings.service';

@Injectable()
export class AnnouncementsService {
    constructor(private _http: Http, private _settings: Settings) {
    }


    getAnnouncements(): Observable<Array<Announcement>> {
        return this._http.get(this._settings.getApiUrl() + 'api/announcements/status/active')
            .map((response) => this.getAnnouncementsHandler(response.json()));

    }

    getAnnouncementsHandler(response) {
        console.log('Service Response');
        console.log(response);
        let result: Array<Announcement> = new Array<Announcement>();
        response.forEach((details) => {
            result.push(AnnouncementsHelper.mapToAnnouncement(details))
        });
        return result;
    }

    getAnnouncementsById(Id: string): Observable<Announcement> {
        return this._http.get(this._settings.getApiUrl() + 'api/announcements/' + Id)
            .map((response) => this.getAnnouncementsByIdHandler(response.json()));
    }

    getAnnouncementsByIdHandler(response) {
        console.log('Get Annoucement ID');
        console.log(response);
        return AnnouncementsHelper.mapToAnnouncement(response);
    }

    getAccounts(): Observable<Array<Account>> {
        return this._http.get(this._settings.getApiUrl() + 'api/accounts/active')
            .map((response) => this.getAccountsHandler(response.json()));
    }

    getAccountsHandler(response) {
        let result: Array<Account> = new Array<Account>();
        response.forEach(account => {
            result.push(AnnouncementsHelper.mapToAccount(account));
        });
        return result;
    }


    CreateAnnouncement(Title: string, Body: string, ExpiryDate: string, WebLinkURL: string, AllClients: boolean, DocumentLink: Array<AnnouncementDocumentLink>, AnnouncementClient: Array<AnnouncementClient>) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        console.log('Create Annoncement');
        return this._http.post(this._settings.getApiUrl() + 'api/announcements/',
            JSON.stringify({
                'Title': Title,
                'Body': Body,
                'ExpiryDate': ExpiryDate,
                'WebLinkURL': WebLinkURL,
                'AllClients': AllClients,
                'DocumentLink': DocumentLink,
                'AnnouncementClients': AnnouncementClient
            }), options)
            .map(response => response.json());
    }

    UpdateAnnouncement(Title: string, Body: string, ExpiryDate: string,announcementId: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        console.log('Update Annoncement');
        return this._http.put(this._settings.getApiUrl() + 'api/announcements/' + announcementId,
            JSON.stringify({
                'Title': Title,
                'Body': Body,
                'ExpiryDate': ExpiryDate
            }), options);
    }

    DeleteAnnouncement(Id: string) {
        return this._http.delete(this._settings.getApiUrl() + 'api/announcements/' + Id);
    }
}