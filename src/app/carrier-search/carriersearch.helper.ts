import {
    ApprovalStatus, BusinessUnit, CompanyType, Country, LegalEntity, LicenceType,
    OperatingCategory, Ownership, Qualifier, Restriction, State, RatingAgency, RatingAgencyScale, Carrier
} from './carriersearch.model'
export class CarrierSearchHelper {

    static mapToApprovalStatus(approvalStatus: any) {
        return new ApprovalStatus(approvalStatus.ApprovalStatusId, approvalStatus.ApprovalStatusName,
            approvalStatus.ApprovalStatusDesc, approvalStatus.Active);
    }

    static mapToBusinessUnit(businessUnit: any) {
        return new BusinessUnit(businessUnit.BusinessUnitId, businessUnit.BusinessEntityId,
            businessUnit.BusinessUnitShortName, businessUnit.BusinessUnitName);
    }

    static mapToCompanyType(companyType: any) {
        return new CompanyType(companyType.CompanyTypeId, companyType.CompanyTypeName,
            companyType.CompanyTypeDesc, companyType.Active);
    }

    static mapToCountry(country: any) {
        return new Country(country.CountryId, country.CountryCode, country.CountryName);
    }

    static mapToLegalEntity(legalEntity: any) {
        return new LegalEntity(legalEntity.EntityId, legalEntity.LegalEntityName);
    }

    static mapToLicenceType(licenceType: any) {
        return new LicenceType(licenceType.LicenceGradeId, licenceType.Description);
    }

    static mapToOperatingCategory(operatingCategory: any) {
        return new OperatingCategory(operatingCategory.CarrierStatusId, operatingCategory.CarrierStatusInd,
            operatingCategory.CarrierStatusDesc)
    }

    static mapToOwnership(ownership: any) {
        return new Ownership(ownership.GroupCodeId, ownership.GroupCode, ownership.GroupName,
            ownership.GroupParentName, ownership.Active);
    }

    static mapToQualifier(qualifier: any) {
        return new Qualifier(qualifier.QualifierId, qualifier.CarrierQualifier, qualifier.CarrierQualifierDesc);
    }

    static mapToRestriction(restriction: any) {
        return new Restriction(restriction.RestrictionCodeId, restriction.RestrictionDesc,
            restriction.RestrictionCode);
    }

    static mapToState(state: any) {
        return new State(state.CountrySubId, state.CountrySubCode, state.CountrySubCodePart,
            state.CountrySubName, state.CountryId);
    }

    static mapToRatingAgency(ratingAgency: any) {
        return new RatingAgency(ratingAgency.RatingAgencyId, ratingAgency.RatingAgencyName);
    }

    static mapToRatingAgencyScale(ratingAgencyScale: any) {
        return new RatingAgencyScale(ratingAgencyScale.RatingAgencyId, ratingAgencyScale.RatingPercentage,
            ratingAgencyScale.RatingAgencyScales);
    }

    static mapToCarrier(carrier: any) {
        return new Carrier(carrier.CarrierId, carrier.LegalName, carrier.MatchType, carrier.Country, carrier.State,
            carrier.CompanyType, carrier.WillisCode, carrier.LorsCode, carrier.NaicCode, carrier.FeinCode,
            carrier.AMBest, carrier.SnP, carrier.Moodys, carrier.Fitch, carrier.PHSCapacity, carrier.AsAtDate,
            carrier.NWP, carrier.CombinedRatioPercentage, carrier.ApprovalStatus, carrier.SanctionStatus,
            carrier.TOBAEndDate, carrier.TOBAIndicator, carrier.FATCAStatus);
    }
}