//export class ClientInfo {
export class PartyInfo {
    // SubscriptionId: string;
    PartyId: number;
    Name: string;
    Country: string;

    constructor(PartyId: number, Name: string, Country: string) {
        this.PartyId = PartyId;
        this.Name = Name;
        this.Country = Country;
    }
}

export class PartyDetails {
    AccountId: number;
    PartyId: number;
    PartyName: string;
    ConsultancyStatus: ConsultancyStatus;
    Access: AccountAccess;


    constructor(AccountId: number, PartyId: number, PartyName: string, ConsultancyStatus: ConsultancyStatus,
        Access: AccountAccess) {
        this.AccountId = AccountId;
        this.PartyId = PartyId;
        this.PartyName = PartyName;
        this.ConsultancyStatus = ConsultancyStatus;
        this.Access = Access;
    }
}

export class AssociatedCarrier {
    CarrierId: number;
    LegalName: string;
    WillisCode: string;
    Comments: string;
    IsDefault: boolean;
    IsDelete: boolean;
    State: AssociationStatus;

    constructor(CarrierId: number, LegalName: string, WillisCode: string,
        Comments: string, IsDefault: boolean, State: AssociationStatus) {
        // this.AccountId = AccountId;
        this.CarrierId = CarrierId;
        this.LegalName = LegalName;
        this.WillisCode = WillisCode;
        this.Comments = Comments;
        this.IsDefault = IsDefault;
        this.State = State;
        this.IsDelete = false;
    }
}

export enum ConsultancyStatus {
    NonConsultancy = 0,
    Consultancy
}

export enum AccountAccess {
    AllAdmins,
    SuperUsersOnly
}

export enum UserRole {
    SuperAdministrator = 1,
    MsdAdministrator,
    MsdBuAdministrator,
    WillisReader,
    ClientReader,
}

export enum AssociationStatus {
    Removed,
    Added,
    Modified,
    None
}

/*
export class updateAccount {
    private AccountName: string;
    private ConsultancyStatus: boolean;
    private AccountLevel: AccountAccess;
    private AssociateAllCarriers: boolean;
    private AssociatedCarriers: Array<AssociatedCarrier>; // to check the declaration (List<AssociatedCarriers>)

    getAccountName(): string {
        return this.AccountName;
    }
    getConsultancyStatus(): boolean {
        return this.ConsultancyStatus;
    }
    getAccountLevel(): AccountAccess {
        return this.AccountLevel;
    }
    getAssociateAllCarriers(): boolean {
        return this.AssociateAllCarriers;
    }
    getAssociatedCarriers(): Array<AssociatedCarrier> {
        return this.AssociatedCarriers;
    }
    setAccountName(value: string) {
        this.AccountName = value;
    }
    setConsultancyStatus(value: boolean) {
        this.ConsultancyStatus = value;
    }
    setAccountLevel(value: AccountAccess) {
        this.AccountLevel = value;
    }
    setAssociateAllCarriers(value: boolean) {
        this.AssociateAllCarriers = value;
    }
    setAssociatedCarriers(value: Array<AssociatedCarrier>) {
        this.AssociatedCarriers = value;
    }
}
*/
export class Account {
    public Id: string;
    public SubscriptionId: string;
    public PartyId: number;
    public PartyName: string;
    public ConsultancyStatus: ConsultancyStatus;
    public AssociateAllCarriers: boolean;
    public AccessLevel: AccountAccess;
    public AssociatedCarriers: Array<AssociatedCarrier>;

    constructor(Id: string, SubscriptionId: string, PartyId: number, PartyName: string, ConsultancyStatus: ConsultancyStatus,
        AssociateAllCarriers: boolean, AccessLevel: AccountAccess, AssociatedCarriers: Array<AssociatedCarrier>) {
        this.Id = Id;
        this.SubscriptionId = SubscriptionId;
        this.PartyId = PartyId;
        this.PartyName = PartyName;
        this.ConsultancyStatus = ConsultancyStatus;
        this.AssociateAllCarriers = AssociateAllCarriers;
        this.AssociatedCarriers = AssociatedCarriers;
        this.AccessLevel = AccessLevel;
    }

    getId(): string {
        return this.Id;
    }
    getSubscriptionId(): string {
        return this.SubscriptionId;
    }
    getPartyId(): number {
        return this.PartyId;
    }
    getPartyName(): string {
        return this.PartyName;
    }
    getAccessLevel(): AccountAccess {
        return this.AccessLevel;
    }
    getConsultancyStatus(): ConsultancyStatus {
        return this.ConsultancyStatus;
    }
    getAssociateAllCarriers(): boolean {
        return this.AssociateAllCarriers;
    }
    getAssociatedCarriers(): Array<AssociatedCarrier> {
        return this.AssociatedCarriers;
    }
    setId(value: string) {
        this.Id = value;
    }
    setSubscriptionId(value: string) {
        this.SubscriptionId = value;
    }
    setPartyId(value: number) {
        this.PartyId = value;
    }
    setPartyName(value: string) {
        this.PartyName = value;
    }
    setConsultancyStatus(value: ConsultancyStatus) {
        this.ConsultancyStatus = value;
    }
    setAccessLevel(value: AccountAccess) {
        this.AccessLevel = value;
    }
    setAssociateAllCarriers(value: boolean) {
        this.AssociateAllCarriers = value;
    }
    setAssociatedCarriers(value: Array<AssociatedCarrier>) {
        this.AssociatedCarriers = value;
    }
}
/*
export class CreateAccount {
    private SubscriptionId: string; // Need to check for GUID
    private PartyId: number;
    private PartyName: string;
    private ConsultancyStatus: ConsultancyStatus;
    private AssociateAllCarriers: boolean;
    private AccessLevel: AccountAccess;
    private AssociatedCarriers: Array<AssociatedCarrier>; // to check the declaration (List<AssociatedCarriers>)

    getSubscriptionId(): string {
        return this.SubscriptionId;
    }
    getPartyId(): number {
        return this.PartyId;
    }
    getPartyName(): string {
        return this.PartyName;
    }
    getAccessLevel(): AccountAccess {
        return this.AccessLevel;
    }
    getConsultancyStatus(): ConsultancyStatus {
        return this.ConsultancyStatus;
    }
    getAssociateAllCarriers(): boolean {
        return this.AssociateAllCarriers;
    }
    getAssociatedCarriers(): Array<AssociatedCarrier> {
        return this.AssociatedCarriers;
    }
    setSubscriptionId(value: string) {
        this.SubscriptionId = value;
    }
    setPartyId(value: number) {
        this.PartyId = value;
    }
    setPartyName(value: string) {
        this.PartyName = value;
    }
    setConsultancyStatus(value: ConsultancyStatus) {
        this.ConsultancyStatus = value;
    }
    setAccessLevel(value: AccountAccess) {
        this.AccessLevel = value;
    }
    setAssociateAllCarriers(value: boolean) {
        this.AssociateAllCarriers = value;
    }
    setAssociatedCarriers(value: Array<AssociatedCarrier>) {
        this.AssociatedCarriers = value;
    }
}*/