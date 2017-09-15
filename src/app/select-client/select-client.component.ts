import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Account } from './select-client.model';
import { ClientService } from './client.service';
import { SelectClientService } from './select.client.service';
import { LoggedInUser } from '../shared/loggedInUser/LoggedInUser';
import { LoaderService } from '../shared/loaderComponent/Loader.service';

@Component({
    selector: 'select-client',
    templateUrl: './select-client.component.html',
    styleUrls: ['./select-client.component.css'],
    providers: [SelectClientService]
})
export class SelectClient {
    accountList: Array<Account>;
    selectedIndex: number;
    isCancelActive: boolean;

    constructor(private _clientService: ClientService, private _selectClientService: SelectClientService,
        private _loggedInUser: LoggedInUser, private _router: Router, private _loaderService: LoaderService) {

        this.redirectToHome();
        if (this._clientService.getSelectedAccount() === undefined ||
            this._clientService.getSelectedAccount() === null) {
            this._loaderService.show();
            this._selectClientService.getAccounts()
                .subscribe((accountList) => {
                    this.handleGetAccounts(accountList);
                    this._loaderService.hide();
                });
        } else if (this._clientService.isChangeSelectedClient()) {
            this.accountList = this._clientService.getAccountList();
            this.isCancelActive = true;
        }

    }

    //redirect to Home if no revert url is available
    redirectToHome() {
        if (this._clientService.getRevertUrl() === undefined)
            this._router.navigateByUrl('/home');
    }

    handleGetAccounts(accountList: Array<Account>) {
        this.accountList = accountList;
        this._clientService.setAccountList(accountList);
        this.selectClient();
    }

    selectClient() {
        if (this.accountList.length === 0) {
            this.selectClient = null;
        } else if (this.accountList.length === 1) {
            this._clientService.setSelectedAccount(this.accountList[0]);
            this.cancel();
        } else if (this.selectedIndex !== undefined) {
            this._clientService.setSelectedAccount(this.accountList[this.selectedIndex]);
            this.cancel();
        }
    }

    cancel() {
        this._clientService.setChangeSelectedClient(false);
        this._router.navigateByUrl(this._clientService.getRevertUrl());
    }
}