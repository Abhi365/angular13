import { Injectable } from '@angular/core';
import {
    ConnectionBackend, RequestOptions, Request, RequestOptionsArgs,
    Response, XHRBackend, Http, URLSearchParams
} from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Settings } from '../settings/settings.service';

@Injectable()
export class HttpProvider extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private _settings: Settings) {
        super(backend, defaultOptions);
    }

    // request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    //     //let headers = new Headers();
    //     //headers.append('Content-Type', 'application/json');
    //     /*if (options)
    //         options.headers.append('Content-Type', 'application/json');*/
    //     //let options = new RequestOptions({ headers: headers });
    //     return super.request(this.updateUrl(url), options);
    // }

    updateUrl(url: string | Request): string | Request {
        if (typeof url === 'string') {
            url = this._settings.getApiUrl() + url;
        } else if (url instanceof Request) {
            url.url = this._settings.getApiUrl() + url.url;
        }
        return url;
    }
}

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, _settings: Settings): Http {
    return new HttpProvider(xhrBackend, requestOptions, _settings);
}

export function serializeUrlParams(obj: Object): URLSearchParams {
    let params: URLSearchParams = new URLSearchParams();
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let element = obj[key];

            params.set(key, element);
        }
    }
    return params;

}