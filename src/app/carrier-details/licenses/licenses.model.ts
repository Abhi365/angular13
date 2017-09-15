export class licenseBusinessType {
    LicenseGradeId: number;
    Description: string;
    BusinessTypeId: number;
    Code: string;
    CountryId: number;

    constructor(LicenseGradeId: number, Description: string, BusinessTypeId: number, Code: string, CountryId: number) {
        this.LicenseGradeId = LicenseGradeId;
        this.Description = Description;
        this.BusinessTypeId = BusinessTypeId;
        this.Code = Code;
        this.CountryId = CountryId;
    }

    getLicenseGradeId(): number {
        return this.LicenseGradeId;
    }
    setLicenseGradeId(LicenseGradeId: number) {
        this.LicenseGradeId = LicenseGradeId;
    }

    getDescription(): string {
        return this.Description;
    }
    setDescription(Description: string) {
        this.Description = Description;
    }
    getBusinessTypeId(): number {
        return this.BusinessTypeId;
    }
    setBusinessTypeId(BusinessTypeId: number) {
        this.BusinessTypeId = BusinessTypeId;
    }
    getCode(): string {
        return this.Code;
    }
    setCode(Code: string) {
        this.Code = Code;
    }
    getCountryId(): number {
        return this.CountryId;
    }
    setCountryId(CountryId: number) {
        this.CountryId = CountryId;
    }
}

export class licenseState{
    LicenseGradeID : string;
    Website : string;
    CountrySubId : number;
    CountrySubName : string;
    CountrySubCode : string;
    LicenseCode : string;
    IsState : boolean;

    constructor(LicenseGradeID : string, Website : string, CountrySubId : number, CountrySubName : string,
     CountrySubCode : string, LicenseCode : string, IsState : boolean){
         this.LicenseGradeID = LicenseGradeID;
         this.Website =  Website;         
         this.CountrySubId = CountrySubId;
         this.CountrySubName = CountrySubName;
         this.CountrySubCode = CountrySubCode;
         this.LicenseCode = LicenseCode;
         this.IsState = IsState;
     }

    getLicenseGradeID(): string {
        return this.LicenseGradeID;
    }
    setLicenseGradeID(LicenseGradeID: string) {
        this.LicenseGradeID = LicenseGradeID;
    }
    getWebsite(): string {
        return this.Website;
    }
    setWebsite(Website: string) {
        this.Website = Website;
    }
    getCountrySubName(): string {
        return this.CountrySubName;
    }
    setCountrySubName(CountrySubName: string) {
        this.CountrySubName = CountrySubName;
    }
    getCountrySubId(): number {
        return this.CountrySubId;
    }
    setCountrySubId(CountrySubId: number) {
        this.CountrySubId = CountrySubId;
    }
    getLicenseCode(): string {
        return this.LicenseCode;
    }
    setLicenseCode(LicenseCode: string) {
        this.LicenseCode = LicenseCode;
    }
    getCountrySubCode(): string {
        return this.CountrySubCode;
    }
    setCountrySubCode(CountrySubCode: string) {
        this.CountrySubCode = CountrySubCode;
    }
    getIsState(): boolean {
        return this.IsState;
    }
    setIsState(IsState: boolean) {
        this.IsState = IsState;
    }

}
