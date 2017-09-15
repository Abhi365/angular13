//will help in common utility static functions 
import { PartyInfo, PartyDetails, AssociatedCarrier, Account, AssociationStatus } from './clientmaintenance.model';
export class CreateClientHelper {

    static mapToPartyInfo(client: any): PartyInfo {
        //return Client Object
        return new PartyInfo(client.PartyId, client.Name, client.Country);
    }
    static mapToPartyDetails(client: any): PartyDetails {
        return new PartyDetails(client.AccountId, client.PartyId, client.PartyName, client.ConsultancyStatus,
            client.AccessLevel)
    }

    static mapToAssociatedCarrier(carrier: any, associationStatus: AssociationStatus): AssociatedCarrier {
        return new AssociatedCarrier(carrier.CarrierId, carrier.LegalName,
            carrier.WillisCode, carrier.Comments, carrier.IsDefault, associationStatus);
    }
    static mapToAccount(party: any): Account {
        return new Account(party.Id, party.SubscriptionId, party.PartyId, party.PartyName, party.ConsultancyStatus,
            party.AssociateAllCarriers, party.AccessLevel, party.AssociatedCarriers);
    }
}