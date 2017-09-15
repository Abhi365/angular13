import { Http, XHRBackend, RequestOptions } from '@angular/http';

export class MockHttp extends Http {
}

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new Http(xhrBackend, requestOptions);
}