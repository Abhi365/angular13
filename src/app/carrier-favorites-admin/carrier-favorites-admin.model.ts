export class CreateFavoriteCategory{
    CategoryName : string;
    ClientId : string;
    CategoryType : FavoriteType;
}
export class UpdateFavoriteCategory{
    CategoryName : string;
    CategoryType : FavoriteType;
}
export class FavoriteCategory{
    CategoryName : string;
    ClientId : string;
    CategoryType : FavoriteType;

    constructor(CategoryName : string,ClientId : string,CategoryType : FavoriteType) {
        this.CategoryName = CategoryName;
        this.ClientId = ClientId;
        this.CategoryType = CategoryType;
    }

    getCategoryName(): string {
        return this.CategoryName;
    }

    setCategoryName(CategoryName: string) {
        this.CategoryName = CategoryName;
    }

    getClientId(): string {
        return this.ClientId;
    }

    setClientId(ClientId: string) {
        this.ClientId = ClientId;
    }
    getCategoryType(): FavoriteType {
        return this.CategoryType;
    }

    setCategoryType(CategoryType: FavoriteType) {
        this.CategoryType = CategoryType;
    }
}
export class FavoriteGroup{
    GroupName : string;
    ClientId : string;
    GroupType : FavoriteType;

    constructor(GroupName : string,ClientId : string,GroupType : FavoriteType) {
        this.GroupName = GroupName;
        this.ClientId = ClientId;
        this.GroupType = GroupType;
    }

    getGroupName(): string {
        return this.GroupName;
    }

    setGroupName(GroupName: string) {
        this.GroupName = GroupName;
    }

    getClientId(): string {
        return this.ClientId;
    }

    setClientId(ClientId: string) {
        this.ClientId = ClientId;
    }
    getGroupType(): FavoriteType {
        return this.GroupType;
    }

    setGroupType(GroupType: FavoriteType) {
        this.GroupType = GroupType;
    }
}
export enum FavoriteType{
    Admin = 1,
    Client,
    User
}
export class CarrierFavorite{
    CarrierId : string;
    LegalName : string;
    WTWCode : string;
    CountryName : string;
    StateName : string;
    constructor(CarrierId : string,LegalName : string,WTWCode : string, CountryName : string, StateName : string ) {
        this.CarrierId = CarrierId;
        this.LegalName = LegalName;
        this.WTWCode = WTWCode;
        this.CountryName = CountryName;
        this.StateName = StateName;
    }

    getCarrierId(): string {
        return this.CarrierId;
    }
    setCarrierId(CarrierId: string) {
        this.CarrierId = CarrierId;
    }
    getLegalName(): string {
        return this.LegalName;
    }
    setLegalName(LegalName: string) {
        this.LegalName = LegalName;
    }
    getWTWCode(): string {
        return this.WTWCode;
    }
    setWTWCode(WTWCode: string) {
        this.WTWCode = WTWCode;
    }
    getCountryName(): string {
        return this.CountryName;
    }
    setCountryName(CountryName: string) {
        this.CountryName = CountryName;
    }
    getStateName(): string {
        return this.StateName;
    }
    setStateName(StateName: string) {
        this.StateName = StateName;
    }
}