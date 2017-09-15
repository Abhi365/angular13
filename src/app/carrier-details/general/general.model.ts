export class carrierGeneralInfo {
    carrierContactDetails: carrierContactDetails;
    carrierApprovalStatus: carrierApprovalStatus;
    carrierRatingSummary: carrierRatingSummary;

    constructor(carrierContactDetails: carrierContactDetails, carrierApprovalStatus: carrierApprovalStatus, carrierRatingSummary: carrierRatingSummary) {
        this.carrierContactDetails = carrierContactDetails;
        this.carrierApprovalStatus = carrierApprovalStatus;
        this.carrierRatingSummary = carrierRatingSummary;

    }
    getCarrierContactDetails(): carrierContactDetails {
        return this.carrierContactDetails;
    }
    setCarrierContactDetails(value: carrierContactDetails) {
        this.carrierContactDetails = value;
    }
    getCarrierApprovalStatus(): carrierApprovalStatus {
        return this.carrierApprovalStatus;
    }
    setCarrierApprovalStatus(value: carrierApprovalStatus) {
        this.carrierApprovalStatus = value;
    }
    getCarrierRatingSummary(): carrierRatingSummary {
        return this.carrierRatingSummary;
    }
    setCarrierRatingSummary(value: carrierRatingSummary) {
        this.carrierRatingSummary = value;
    }
}

export class carrierContactDetails {
    country: string;
    state: string;
    type: string;
    group: string;
    groupCodeId : string;
    legalName: string;
    carrierMainEntity: carrierMainEntity;
    fatcaComplianceStatus: string;
    fatcaCertificateNumber: string;
    fatcaEntityType: string;
    willis: string;
    fein: string;
    naic: string;
    lors: string;
    fetInd: string;
    tobaIndicator: string;
    tobaType: string;
    legalEntity: string;
    fullAddress: string;
    establishedDate: string;
    operatingCategory: string;
    comments: Array<string>;
    organizationType: string;
    marketSecurityContact: string;
    marketSecurityAnalyst: string;


    constructor(country: string, state: string, type: string, group: string, groupCodeId:string, legalName: string,
        carrierMainEntity: carrierMainEntity, fatcaComplianceStatus: string, fatcaCertificateNumber: string, fatcaEntityType: string,
        willis: string, fein: string, naic: string, lors: string, fetInd: string, tobaIndicator: string, tobaType: string, legalEntity: string, fullAddress: string,
        establishedDate: string, operatingCategory: string, comments: Array<string>, organizationType: string,
        marketSecurityContact: string, marketSecurityAnalyst: string) {

        this.country = country;
        this.state = state;
        this.type = type;
        this.group = group;
        this.groupCodeId = groupCodeId;
        this.legalName = legalName;
        this.carrierMainEntity = carrierMainEntity;
        this.fatcaComplianceStatus = fatcaComplianceStatus;
        this.fatcaCertificateNumber = fatcaCertificateNumber;
        this.fatcaEntityType = fatcaEntityType;
        this.willis = willis;
        this.fein = fein;
        this.naic = naic;
        this.lors = lors;
        this.fetInd = fetInd;
        this.tobaIndicator = tobaIndicator;
        this.tobaType = tobaType;
        this.legalEntity = legalEntity;
        this.fullAddress = fullAddress;
        this.establishedDate = establishedDate;
        this.operatingCategory = operatingCategory;
        this.comments = comments;
        this.organizationType = organizationType;
        this.marketSecurityContact = marketSecurityContact;
        this.marketSecurityAnalyst = marketSecurityAnalyst;
    }

    getCountry(): string {
        return this.country;
    }
    setCountry(country: string) {
        this.country = country;
    }

    getState(): string {
        return this.state;
    }
    setState(state: string) {
        this.state = state;
    }
    getType(): string {
        return this.type;
    }
    setType(type: string) {
        this.type = type;
    }
    getGroup(): string {
        return this.group;
    }
    setGroup(group: string) {
        this.group = group;
    }
     getGroupCodeId(): string {
        return this.groupCodeId;
    }
    setGroupCodeId(groupCodeId: string) {
        this.groupCodeId = groupCodeId;
    }
    geLlegalName(): string {
        return this.legalName;
    }
    setLegalName(legalName: string) {
        this.legalName = legalName;
    }
    getCarrierMainEntity(): carrierMainEntity {
        return this.carrierMainEntity;
    }
    setCarrierMainEntity(CarrierMainEntity: carrierMainEntity) {
        this.carrierMainEntity = CarrierMainEntity;
    }
    getFatcaComplianceStatus(): string {
        return this.fatcaComplianceStatus;
    }
    setFatcaComplianceStatus(fatcaComplianceStatus: string) {
        this.fatcaComplianceStatus = fatcaComplianceStatus;
    }
    getFatcaCertificateNumber(): string {
        return this.fatcaCertificateNumber;
    }
    setFatcaCertificateNumber(fatcaCertificateNumber: string) {
        this.fatcaCertificateNumber = fatcaCertificateNumber;
    }
    getFactaEntityType(): string {
        return this.fatcaEntityType;
    }
    setFatcaEntityType(fatcaEntityType: string) {
        this.fatcaEntityType = fatcaEntityType;
    }
    getWillis(): string {
        return this.willis;
    }
    setWillis(willis: string) {
        this.willis = willis;
    }
    getNaic(): string {
        return this.naic;
    }
    setNaic(naic: string) {
        this.naic = naic;
    }
    getLors(): string {
        return this.lors;
    }
    setLors(lors: string) {
        this.lors = lors;
    }
    getFetInd(): string {
        return this.fetInd;
    }
    setFetInd(fetInd: string) {
        this.fetInd = fetInd;
    }
    getTobaIndicator(): string {
        return this.tobaIndicator;
    }
    setTobaIndicator(tobaIndicator: string) {
        this.tobaIndicator = tobaIndicator;
    }
    getTobaType(): string {
        return this.tobaType;
    }
    setTobaType(tobaType: string) {
        this.tobaType = tobaType;
    }
    getLegalEntity(): string {
        return this.legalEntity;
    }
    setLegalEntity(legalEntity: string) {
        this.legalEntity = legalEntity;
    }
    getFullAddress(): string {
        return this.fullAddress;
    }
    setFullAddress(fullAddress: string) {
        this.fullAddress = fullAddress;
    }
    getEstablishedDate(): string {
        return this.establishedDate;
    }
    setEstablishedDate(establishedDate: string) {
        this.establishedDate = establishedDate;
    }
    getOperatingCategory(): string {
        return this.operatingCategory;
    }
    setOperatingCategory(operatingCategory: string) {
        this.operatingCategory = operatingCategory;
    }
    getComments(): Array<string> {
        return this.comments;
    }
    setComments(Comments: Array<string>) {
        this.comments = Comments;
    }
    getOrganizationType(): string {
        return this.organizationType;
    }
    setOrganizationType(organizationType: string) {
        this.organizationType = organizationType;
    }
    getMarketSecurityContact(): string {
        return this.marketSecurityContact;
    }
    setMarketSecurityContact(marketSecurityContact: string) {
        this.marketSecurityContact = marketSecurityContact;
    }
    getMarketSecurityAnalyst(): string {
        return this.marketSecurityAnalyst;
    }
    setMarketSecurityAnalyst(marketSecurityAnalyst: string) {
        this.marketSecurityAnalyst = marketSecurityAnalyst;
    }

}

export class carrierApprovalStatus {
    approvalStatus: string;
    businessUnit: Array<string>;
    restriction: Array<string>;
    qualifiers: Array<string>;
    comments: Array<string>;

    constructor(approvalStatus: string, businessUnit: Array<string>, restriction: Array<string>, qualifiers: Array<string>, comments: Array<string>) {

        this.approvalStatus = approvalStatus;
        this.businessUnit = businessUnit;
        this.restriction = restriction;
        this.qualifiers = qualifiers;
        this.comments = comments;
    }
    getApprovalStatus(): string {
        return this.approvalStatus;
    }
    setApprovalStatus(approvalStatus: string) {
        this.approvalStatus = approvalStatus;
    }
    getBusinessUnit(): Array<string> {
        return this.businessUnit;
    }
    setBusinessUnit(value: Array<string>) {
        this.businessUnit = value;
    }
    getRestriction(): Array<string> {
        return this.restriction;
    }
    setRestriction(value: Array<string>) {
        this.restriction = value;
    }
    getQualifiers(): Array<string> {
        return this.qualifiers;
    }
    setQualifiers(value: Array<string>) {
        this.qualifiers = value;
    }
    getComments(): Array<string> {
        return this.qualifiers;
    }
    setComments(value: Array<string>) {
        this.comments = value;
    }
}

export class carrierRatingSummary {
    ratingAgencyId: string;
    ratingAgencyName: string;
    ratings: string;
    outLook: string;
    date: string;
    reference: string;

    constructor(ratingAgencyId: string, ratingAgencyName: string, ratings: string, outLook: string, date: string, reference: string) {
        this.ratingAgencyId = ratingAgencyId;
        this.ratingAgencyName = ratingAgencyName;
        this.ratings = ratings;
        this.outLook = outLook;
        this.date = date;
        this.reference = reference;
    }

    getRatingAgencyId(): string {
        return this.ratingAgencyId;
    }
    setRatingAgencyId(ratingAgencyId: string) {
        this.ratingAgencyId = ratingAgencyId;
    }
    getRatingAgencyName(): string {
        return this.ratingAgencyName;
    }
    setRatingAgencyName(ratingAgencyName: string) {
        this.ratingAgencyName = ratingAgencyName;
    }
    getRatings(): string {
        return this.ratings;
    }
    setRatings(ratings: string) {
        this.ratings = ratings;
    }
    getOutLook(): string {
        return this.outLook;
    }
    setOutlook(outLook: string) {
        this.outLook = outLook;
    }
    getDate(): string {
        return this.date;
    }
    setDate(date: string) {
        this.date = date;
    }
    getReference(): string {
        return this.reference;
    }
    setReference(reference: string) {
        this.reference = reference;
    }
}

export class carrierMainEntity {
    mainCompCode: string;
    mainLegalName: string;
    parentUseInMosaic: number;
    parentCarrierId: number;
    constructor(mainCompCode: string, mainLegalName: string, parentUseInMosaic: number, parentCarrierId: number) {
        this.mainCompCode = mainCompCode;
        this.mainLegalName = mainLegalName;
        this.parentUseInMosaic = parentUseInMosaic;
        this.parentCarrierId = parentCarrierId
    }

    getMainCompCode(): string {
        return this.mainCompCode;
    }
    setMainCompCode(mainCompCode: string) {
        this.mainCompCode = mainCompCode;
    }
    getMainLegalName(): string {
        return this.mainLegalName;
    }
    setMainLegalName(mainLegalName: string) {
        this.mainLegalName = mainLegalName;
    }
    getParentUseInMosaic(): number {
        return this.parentUseInMosaic;
    }
    setParentUseInMosaic(parentUseInMosaic: number) {
        this.parentUseInMosaic = parentUseInMosaic;
    }
    getParentCarrierId(): number {
        return this.parentCarrierId;
    }
    setParentCarrierId(parentCarrierId: number) {
        this.parentCarrierId = parentCarrierId;
    }
}

// export class approvalStatus {
//     carrierApprovalStatusAuditTrail: carrierApprovalStatusAuditTrail;

//     constructor(carrierApprovalStatusAuditTrail: carrierApprovalStatusAuditTrail) {
//         this.carrierApprovalStatusAuditTrail = carrierApprovalStatusAuditTrail;
//     }
// }

export class carrierApprovalStatusAuditTrail {
    approvalStatusAuditTrailChangeTypeDesc: string;
    approvalStatusAuditTrailPriorValue: string;
    approvalStatusAuditTrailNewValue: string;
    approvalStatusAuditTrailEffectiveDate: string;

    constructor(approvalStatusAuditTrailChangeTypeDesc: string, approvalStatusAuditTrailPriorValue: string,
        approvalStatusAuditTrailNewValue: string, approvalStatusAuditTrailEffectiveDate: string) {
        this.approvalStatusAuditTrailChangeTypeDesc = approvalStatusAuditTrailChangeTypeDesc;
        this.approvalStatusAuditTrailPriorValue = approvalStatusAuditTrailPriorValue;
        this.approvalStatusAuditTrailNewValue = approvalStatusAuditTrailNewValue;
        this.approvalStatusAuditTrailEffectiveDate = approvalStatusAuditTrailEffectiveDate;
    }
    getApprovalStatusAuditTrailChangeTypeDesc(): string {
        return this.approvalStatusAuditTrailChangeTypeDesc;
    }
    setApprovalStatusAuditTrailChangeTypeDesc(approvalStatusAuditTrailChangeTypeDesc: string) {
        this.approvalStatusAuditTrailChangeTypeDesc = approvalStatusAuditTrailChangeTypeDesc;
    }
    getApprovalStatusAuditTrailPriorValue(): string {
        return this.approvalStatusAuditTrailPriorValue;
    }
    setApprovalStatusAuditTrailPriorValue(approvalStatusAuditTrailPriorValue: string) {
        this.approvalStatusAuditTrailPriorValue = approvalStatusAuditTrailPriorValue;
    }
    getApprovalStatusAuditTrailNewValue(): string {
        return this.approvalStatusAuditTrailNewValue;
    }
    setApprovalStatusAuditTrailNewValue(approvalStatusAuditTrailNewValue: string) {
        this.approvalStatusAuditTrailNewValue = approvalStatusAuditTrailNewValue;
    }
    getApprovalStatusAuditTrailEffectiveDate(): string {
        return this.approvalStatusAuditTrailEffectiveDate;
    }
    setApprovalStatusAuditTrailEffectiveDate(approvalStatusAuditTrailEffectiveDate: string) {
        this.approvalStatusAuditTrailEffectiveDate = approvalStatusAuditTrailEffectiveDate;
    }
}

export class carrierRatingAuditTrail {
    description: string;
    statementYear: number;
    priorValue: string;
    newValue: string;
    effectiveDate: string;

    constructor(description: string, statementYear: number, priorValue: string, newValue: string,
        effectiveDate: string) {
        this.description = description;
        this.statementYear = statementYear;
        this.priorValue = priorValue;
        this.newValue = newValue;
        this.effectiveDate = effectiveDate;
    }
    getDescription(): string {
        return this.description;
    }
    setDescription(description: string) {
        this.description = description;
    }
    getStatementYear(): number {
        return this.statementYear;
    }
    setstatementYear(statementYear: number) {
        this.statementYear = statementYear;
    }
    getPriorValue(): string {
        return this.priorValue;
    }
    setPriorValue(priorValue: string) {
        this.priorValue = priorValue;
    }
    getNewValue(): string {
        return this.newValue;
    }
    setNewValue(newValue: string) {
        this.newValue = newValue;
    }
     getEffectiveDate(): string {
        return this.effectiveDate;
    }
    setEffectiveDate(effectiveDate: string) {
        this.effectiveDate = effectiveDate;
    }
}

export class willisShortNames {
    willisShortName: string;
    businessUnitName: string;

    constructor(willisShortName: string, businessUnitName: string) {
        this.willisShortName = willisShortName;
        this.businessUnitName = businessUnitName;
    }

    getWillisShortName(): string {
        return this.willisShortName;
    }
    setWillisShortName(willisShortName: string) {
        this.willisShortName = willisShortName;
    }

    getBusinessUnitName(): string {
        return this.businessUnitName;
    }
    setBusinessUnitName(businessUnitName: string) {
        this.businessUnitName = businessUnitName;
    }

}