import { Injectable } from '@angular/core';

import { Account, AssociatedCarrier } from './clientmaintenance.model';
@Injectable()
export class ClientMaintenaceState {
    private account: Account;
    // it contains the tempered new list
    private associatedCarriers: Array<AssociatedCarrier>;

    private editClient: boolean;

    getAccount(): Account {
        return this.account;
    }

    setAccount(account: Account) {
        this.account = account;
    }

    setAssociatedCarriers(associatedCarriers: Array<AssociatedCarrier>) {
        this.associatedCarriers = associatedCarriers;
    }

    getAssociatedCarriers(): Array<AssociatedCarrier> {
        return this.associatedCarriers;
    }

    getEditClient() {
        return this.editClient;
    }

    setEditClient(editClient: boolean) {
        this.editClient = editClient;
    }
}