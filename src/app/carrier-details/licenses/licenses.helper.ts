import {licenseBusinessType, licenseState} from './licenses.model';

export class LicensesHelper {
    static mapToLicenseType(licenses : any) : licenseBusinessType {
       return new licenseBusinessType(licenses.LicenseGradeId, licenses.Description, licenses.BusinessTypeId,
    licenses.Code, licenses.CountryId)
    }

    static mapToLicenseGradeDetails(licenseGrade : any) : licenseState {
        return new licenseState(licenseGrade.LicenseGradeID, licenseGrade.Website, licenseGrade.CountrySubId,
            licenseGrade.CountrySubName, licenseGrade.CountrySubCode, licenseGrade.LicenseCode, licenseGrade.IsState)
    }
        
}