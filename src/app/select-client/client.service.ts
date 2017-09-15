import { Injectable } from '@angular/core';

import { Account } from './select-client.model'

import { Carrier, BusinessUnit } from '../carrier-search/carriersearch.model';
import { licenseState, licenseBusinessType } from '../carrier-details/licenses/licenses.model';
import { carrierContactDetails } from '../carrier-details/general/general.model';

@Injectable()
export class ClientService {

    private accountList: Array<Account>;
    private revertUrl: string;
    private changeSelectedClient: boolean;
    private licenseState: licenseState;
    private group : string;
    private licenseType : number;
    private groupname : string;

    selectedAccount: Account;

    selectedCarriers: Array<Carrier>;

    // selectedBusinessUnits: Array<BusinessUnit>;


    // status flag for each page, where we want to redirect to and from carrier search page
    redirectToClientMaintenance: boolean;

    setAccountList(accountList: Array<Account>) {
        this.accountList = accountList;
    }

    getAccountList() {
        return this.accountList;
    }

    setRevertUrl(url: string) {
        this.revertUrl = url;
    }

    getRevertUrl() {
        return this.revertUrl;
    }

    isChangeSelectedClient() {
        return this.changeSelectedClient;
    }

    setChangeSelectedClient(flag: boolean) {
        this.changeSelectedClient = flag;
    }


    setCarriers(carriers: Array<Carrier>) {
        this.selectedCarriers = carriers;
    }

    getCarriers(): Array<Carrier> {
        return this.selectedCarriers;
    }

    getSelectedAccount() {
        return this.selectedAccount;
    }

    setSelectedAccount(client: Account) {
        this.selectedAccount = client;
    }

    setRedirectToClientMaintenance(status: boolean) {
        this.redirectToClientMaintenance = status;
    }

    getRedirectToClientMaintenance(): boolean {
        return this.redirectToClientMaintenance;
    }

    getLicenseState() {
        return this.licenseState;
    }

    setLicenseState(licenseState: licenseState) {
        this.licenseState = licenseState;
    }

    getOwnership() {
        return this.group;
    }
    setOwnership(group: string) {
        this.group = group;
    }
    getLicensed(){
        return this.licenseType;
    }
    setLicensed(licenseType : number ){
        this.licenseType = licenseType;
    }


}