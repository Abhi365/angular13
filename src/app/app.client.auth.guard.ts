import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { ClientService } from './select-client/client.service';

@Injectable()
export class ClientAuthGuard implements CanActivate {

    constructor(private _router: Router, private _clientService: ClientService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : boolean | Observable<boolean> | Promise<boolean> {
        if (state.url.endsWith('carrier-search') ||
            state.url.endsWith('notification') || state.url.endsWith('carrier-doc')) {
            this.checkIfChangeSelectedClient(state.url);
        }
        return true;
    }

    checkIfChangeSelectedClient(url: string) {
        if (this._clientService.isChangeSelectedClient()
            || this._clientService.getSelectedAccount() === undefined) {
            this._clientService.setRevertUrl(url);
            this._router
                .navigateByUrl('/select-client');
        }
    }

}