
export class Country {
    CountryId: number;
    CountryCode: number;
    CountryName: string;

    constructor(CountryId: number, CountryCode: number, CountryName: string) {
        this.CountryId = CountryId;
        this.CountryCode = CountryCode;
        this.CountryName = CountryName;
    }
}

export class State {
    CountrySubId: number;
    CountrySubCode: string;
    CountrySubCodePart: string;
    CountrySubName: string;
    CountryId: string;

    constructor(CountrySubId: number, CountrySubCode: string, CountrySubCodePart: string,
        CountrySubName: string, CountryId: string) {
        this.CountrySubId = CountrySubId;
        this.CountrySubCode = CountrySubCode;
        this.CountrySubCodePart = CountrySubCodePart;
        this.CountrySubName = CountrySubName;
        this.CountryId = CountryId;
    }
}
export class ApprovalStatus {
    ApprovalStatusId: number;
    ApprovalStatusName: string;
    ApprovalStatusDesc: string;
    Active: string;

    constructor(ApprovalStatusId: number, ApprovalStatusName: string, ApprovalStatusDesc: string, Active: string) {
        this.ApprovalStatusId = ApprovalStatusId;
        this.ApprovalStatusName = ApprovalStatusName;
        this.ApprovalStatusDesc = ApprovalStatusDesc;
        this.Active = Active;
    }
}
export class BusinessUnit {
    BusinessUnitId: number;
    BusinessEntityId: number;
    BusinessUnitShortName: string;
    BusinessUnitName: string;

    constructor(BusinessUnitId: number, BusinessEntityId: number, BusinessUnitShortName: string,
        BusinessUnitName: string) {
        this.BusinessUnitId = BusinessUnitId;
        this.BusinessEntityId = BusinessEntityId;
        this.BusinessUnitShortName = BusinessUnitShortName;
        this.BusinessUnitName = BusinessUnitName;
    }
}

export class CompanyType {
    CompanyTypeId: number;
    CompanyTypeName: string;
    CompanyTypeDesc: string;
    Active: string;

    constructor(CompanyTypeId: number, CompanyTypeName: string, CompanyTypeDesc: string, Active: string) {
        this.CompanyTypeId = CompanyTypeId
        this.CompanyTypeName = CompanyTypeName;
        this.CompanyTypeDesc = CompanyTypeDesc;
        this.Active = Active;
    }
}

export class LegalEntity {
    EntityId: number;
    LegalEntityName: string;

    constructor(EntityId: number, LegalEntityName: string) {
        this.EntityId = EntityId;
        this.LegalEntityName = LegalEntityName;
    }
}

export class LicenceType {
    LicenceGradeId: number;
    Description: string;

    constructor(LicenceGradeId: number, Description: string) {
        this.LicenceGradeId = LicenceGradeId;
        this.Description = Description;
    }
}

export class OperatingCategory {
    CarrierStatusId: number;
    CarrierStatusInd: number;
    CarrierStatusDesc: string;

    constructor(CarrierStatusId: number, CarrierStatusInd: number, CarrierStatusDesc: string) {
        this.CarrierStatusId = CarrierStatusId;
        this.CarrierStatusInd = CarrierStatusInd;
        this.CarrierStatusDesc = CarrierStatusDesc;
    }
}

export class Ownership {
    GroupCodeId: string;
    GroupCode: string;
    GroupName: string;
    GroupParentName: string;
    Active: string;

    constructor(GroupCodeId: string, GroupCode: string, GroupName: string, GroupParentName: string,
        Active: string) {
        this.GroupCodeId = GroupCodeId;
        this.GroupCode = GroupCode;
        this.GroupName = GroupName;
        this.GroupParentName = GroupParentName;
        this.Active = Active;
    }
}

export class Qualifier {
    QualifierId: number;
    CarrierQualifier: string;
    CarrierQualifierDesc: string;
    constructor(QualifierId: number, CarrierQualifier: string, CarrierQualifierDesc: string) {
        this.QualifierId = QualifierId;
        this.CarrierQualifier = CarrierQualifier;
        this.CarrierQualifierDesc = CarrierQualifierDesc;
    }
}

export class Restriction {
    RestrictionCodeId: number;
    RestrictionDesc: string;
    RestrictionCode: string;
    constructor(RestrictionCodeId: number, RestrictionDesc: string, RestrictionCode: string) {
        this.RestrictionCodeId = RestrictionCodeId;
        this.RestrictionDesc = RestrictionDesc;
        this.RestrictionCode = RestrictionCode;
    }
}

export class SearchRequest {
    LegalName: string;
    CountryId: number;
    CountrySubId: number;
    CompanyTypeId: number;
    ApprovalStatusId: number;
    CodeSelection: number;
    Code: string;
    LegalNameOperator: string;
    GroupCodeId: string;
    LicenseCountryId: number;
    LicenseStateId: number;
    LicenseCodeId: number;
    ClientId: string;
    RatingAgencyId: number;
    RatingAgencyOperator: string;
    RatingRange: number;
    Default: boolean;
    ApprovalStatusAllowed: boolean;
    RefCode: string;
    CategoryId: number;
    CarrierFavoriteId: number;
    BusinessUnitId: number;
    ResctrictionCodeId: number;
    QualifierId: number;
    CarrierStatusId: number;
    IsWillisUser: number;
    LegalEntity: number;
    TobaIndicator: string;
    Mode: string;
}

export class Carrier {
    CarrierId: number;
    LegalName: string;
    MatchType: string;
    Country: string;
    State: string;
    CompanyType: string;
    WillisCode: string;
    LorsCode: string;
    NaicCode: string;
    FeinCode: string;
    AMBest: string;
    SnP: string;
    Moodys: string;
    Fitch: string;
    PHSCapacity: string;
    AsAtDate: string;
    NWP: string;
    CombinedRatioPercentage: string;
    ApprovalStatus: string;
    SanctionStatus: string;
    TOBAEndDate: string;
    TOBAIndicator: string;
    FATCAStatus: string;
    select: boolean;

    constructor(CarrierId: number, LegalName: string, MatchType: string, Country: string, State: string, CompanyType: string,
        WillisCode: string, LorsCode: string, NaicCode: string, FeinCode: string, AMBest: string, SnP: string,
        Moodys: string, Fitch: string, PHSCapacity: string, AsAtDate: string, NWP: string,
        CombinedRatioPercentage: string, ApprovalStatus: string, SanctionStatus: string, TOBAEndDate: string,
        TOBAIndicator: string, FATCAStatus: string) {
        this.CarrierId = CarrierId;
        this.LegalName = LegalName;
        this.MatchType = MatchType;
        this.Country = Country;
        this.State = State;
        this.CompanyType = CompanyType;
        this.WillisCode = WillisCode;
        this.LorsCode = LorsCode;
        this.NaicCode = NaicCode;
        this.FeinCode = FeinCode;
        this.AMBest = AMBest;
        this.SnP = SnP;
        this.Moodys = Moodys;
        this.Fitch = Fitch;
        this.PHSCapacity = PHSCapacity;
        this.AsAtDate = AsAtDate;
        this.NWP = NWP;
        this.CombinedRatioPercentage = CombinedRatioPercentage;
        this.ApprovalStatus = ApprovalStatus;
        this.SanctionStatus = SanctionStatus;
        this.TOBAEndDate = TOBAEndDate;
        this.TOBAIndicator = TOBAIndicator;
        this.FATCAStatus = FATCAStatus;
        this.select = false;
    }
}

export class RatingAgency {
    RatingAgencyId: number;
    RatingAgencyName: string;

    constructor(RatingAgencyId: number, RatingAgencyName: string) {
        this.RatingAgencyId = RatingAgencyId;
        this.RatingAgencyName = RatingAgencyName;
    }
}

export class RatingAgencyScale {
    RatingAgencyId: number;
    RatingPercentage: string;
    RatingAgencyScales: string;

    constructor(RatingAgencyId: number, RatingPercentage: string, RatingAgencyScales: string) {
        this.RatingAgencyId = RatingAgencyId;
        this.RatingPercentage = RatingPercentage;
        this.RatingAgencyScales = RatingAgencyScales;
    }
}