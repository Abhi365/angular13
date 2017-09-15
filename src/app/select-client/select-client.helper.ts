import { Account } from './select-client.model'

export class SelectClientHelper {
    static mapToAccount(account: any): Account {
        return new Account(account.Id, account.PartyId, account.PartyName);
    }
}