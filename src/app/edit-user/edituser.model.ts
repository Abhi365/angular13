export class Role {
    RoleCode: string;
    RoleDescription: string;
    RoleId: string;
    Rank: number;

    constructor(RoleId: string, RoleCode: string, RoleDescription: string, Rank: number) {
        this.RoleId = RoleId;
        this.RoleCode = RoleCode;
        this.RoleDescription = RoleDescription;
        this.Rank = Rank;
    }

    getRank() {
        return this.Rank;
    }
}

export class Account {
    Id: string;
    PartyId: string;
    PartyName: string;
    ActionIndicator: AccountActionIndicator;

    constructor(Id: string, PartyId: string, PartyName: string, ActionIndicator: AccountActionIndicator) {
        this.Id = Id;
        this.PartyId = PartyId;
        this.PartyName = PartyName;
        this.ActionIndicator = ActionIndicator;
    }
}

export class UserDetails {
    PrincipleId: string;
    UserId: string;
    DisplayName: string
    Surname: string;
    Forename: string;
    Initials: string;
    EmailAddress: string;
    Country: string;
    UserLogin: string;
    UserRole: Role;
    AccountList: Array<Account>;

    constructor(PrincipleId: string, UserId: string, DisplayName: string, Surname: string,
        Forename: string, Initials: string, EmailAddress: string, Country: string, UserLogin: string) {
        this.PrincipleId = PrincipleId;
        this.DisplayName = DisplayName;
        this.Surname = Surname;
        this.Forename = Forename;
        this.Initials = Initials;
        this.EmailAddress = EmailAddress;
        this.Country = Country;
        this.UserLogin = UserLogin;
    }

    setAccountList(AccountList: Array<Account>) {
        this.AccountList = AccountList;
    }

    setUserRole(userRole: Role) {
        this.UserRole = userRole;
    }

    setUserId(userId: string) {
        this.UserId = userId;
    }
}

export enum UserType {
    Internal = 1,
    External
}

export enum UserStatus {
    Online = 1,
    Offline
}

export enum UserRole {
    SuperAdministrator = 1,
    MsdAdministrator,
    MsdBuAdministrator,
    WillisReader,
    ClientReader,
}

export enum AccountActionIndicator {
    Remove = 0,
    Add,
    None
}




