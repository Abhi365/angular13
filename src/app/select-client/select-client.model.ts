
export class Account {
    Id: string;
    PartyId: number;
    PartyName: string;

    constructor(Id: string, PartyId: number, PartyName: string) {
        this.Id = Id;
        this.PartyId = PartyId;
        this.PartyName = PartyName;
    }
}