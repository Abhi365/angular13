import { carrierGeneralInfo, carrierContactDetails, carrierMainEntity,
     carrierApprovalStatus, carrierRatingSummary, carrierApprovalStatusAuditTrail,carrierRatingAuditTrail, willisShortNames  } from './general.model';
export class GeneralHelper {

    static mapToGeneralInfo(agency: any): carrierGeneralInfo {
        return new carrierGeneralInfo(agency.carrierContactDetails, agency.carrierApprovalStatus, agency.carrierRatingSummary);
    }

    static mapToContactInfo(contact: any): carrierContactDetails {
        return new carrierContactDetails(contact.country, contact.state, contact.type, contact.group,contact.groupCodeId, contact.legalName,
        contact.carrierMainEntity, contact.fatcaComplianceStatus, contact.fatcaCertificateNumber, 
        contact.fatcaEntityType,contact.willis, contact.fein, contact.naic, contact.lors, contact.fetInd, contact.tobaIndicator, contact.tobaType, 
        contact.legalEntity, contact.fullAddress,contact.establishedDate, contact.operatingCategory, contact.comments, contact.organizationType,
        contact.marketSecurityContact, contact.marketSecurityAnalystcarrierContactDetails);
    }
    
    static mapToApprovalInfo(approval: any): carrierApprovalStatus {
        return new carrierApprovalStatus(approval.approvalStatus, approval.businessUnit, approval.restriction, approval.qualifiers, approval.comments);
    }

    static mapToMainEntityInfo(entity: any): carrierMainEntity {
        return new carrierMainEntity(entity.mainCompCode, entity.mainLegalName, entity.parentUseInMosaic,entity.parentCarrierId);
    }

    static mapToRatingInfo(rating: any): carrierRatingSummary {
        return new carrierRatingSummary(rating.ratingAgencyId,rating.ratingAgencyName,rating.outLook,rating.ratings,rating.date,rating.reference);
    }

    // static mapToStatusInfo(status: any): approvalStatus {
    //     return new approvalStatus(status.carrierApprovalStatusAuditTrail);
    // }

    static mapToAuditTrailInfo(auditTrail: any): carrierApprovalStatusAuditTrail {
        return new carrierApprovalStatusAuditTrail(auditTrail.approvalStatusAuditTrailChangeTypeDesc,
        auditTrail.approvalStatusAuditTrailEffectiveDate, auditTrail.approvalStatusAuditTrailPriorValue, auditTrail.approvalStatusAuditTrailNewValue);
    }

    static mapToRatingTrail(ratingTrail: any): carrierRatingAuditTrail {
        return new carrierRatingAuditTrail(ratingTrail.description,ratingTrail.priorValue,ratingTrail.newValue,
        ratingTrail.effectiveDate,ratingTrail.statementYear);
    }

    static mapToWillisInfo(willis: any): willisShortNames {
        return new willisShortNames(willis.willisShortName, willis.businessUnitName);
    }
}
