import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import { serializeUrlParams } from '../shared/http/http.factory';
import { Settings } from '../shared/settings/settings.service';
import {
    ApprovalStatus, BusinessUnit, CompanyType, Country, LegalEntity, LicenceType,
    OperatingCategory, Ownership, Qualifier, Restriction, State, RatingAgency, RatingAgencyScale,
    SearchRequest, Carrier
} from './carriersearch.model';
import { CarrierSearchHelper } from './carriersearch.helper';

@Injectable()
export class CarrierSearchService {
    constructor(private _http: Http, private _settings: Settings) { }

    getCountries() {
        return this._http.get(this._settings.getApiUrl() + 'api/countries')
            .map((response) => this.getCountriesHandler(response.json()));
    }

    getCountriesHandler(response) {
        let result: Array<Country> = new Array<Country>();
        response.forEach((country) => {
            result.push(CarrierSearchHelper.mapToCountry(country))
        });
        return result;
    }

    getStates(countryId: number) {
        return this._http.get(this._settings.getApiUrl() + 'api/countries/' + countryId + '/states')
            .map((response) => this.getStatesHandler(response.json()));
    }

    getStatesHandler(response) {
        let result: Array<State> = new Array<State>();
        response.forEach((state) => {
            result.push(CarrierSearchHelper.mapToState(state))
        });
        return result;
    }

    getApprovalStatus() {
        return this._http.get(this._settings.getApiUrl() + 'api/reference-data/approval-status')
            .map((response) => this.getApprovalStatusHandler(response));
    }

    getApprovalStatusHandler(response) {
        let result: Array<ApprovalStatus> = new Array<ApprovalStatus>();
        JSON.parse(response.json().JsonData).forEach((approvalStatus) => {
            result.push(CarrierSearchHelper.mapToApprovalStatus(approvalStatus))
        });
        return result;
    }

    getOwnerships() {
        return this._http.get(this._settings.getApiUrl() + 'api/reference-data/ownership')
            .map((response) => this.getOwnershipsHandler(response));
    }

    getOwnershipsHandler(response) {
        let result: Array<Ownership> = new Array<Ownership>();
        JSON.parse(response.json().JsonData).forEach((ownership) => {
            result.push(CarrierSearchHelper.mapToOwnership(ownership))
        });
        return result;
        
    }

    getCompanyTypes() {
        return this._http.get(this._settings.getApiUrl() + 'api/reference-data/company-types')
            .map((response) => this.getCompanyTypesHandler(response));
    }

    getCompanyTypesHandler(response) {
        let result: Array<CompanyType> = new Array<CompanyType>();
        JSON.parse(response.json().JsonData).forEach((companyType) => {
            result.push(CarrierSearchHelper.mapToCompanyType(companyType))
        });
        return result;
    }

    getBusinessUnits() {
        return this._http.get(this._settings.getApiUrl() + 'api/reference-data/business-units')
            .map((response) => this.getBusinessUnitsHandler(response));
    }

    getBusinessUnitsHandler(response) {
        let result: Array<BusinessUnit> = new Array<BusinessUnit>();
        JSON.parse(response.json().JsonData).forEach((businessUnit) => {
            result.push(CarrierSearchHelper.mapToBusinessUnit(businessUnit))
        });
        return result;
    }

    getQualifiers() {
        return this._http.get(this._settings.getApiUrl() + 'api/reference-data/qualifiers')
            .map((response) => this.getQualifiersHandler(response));
    }

    getQualifiersHandler(response) {
        let result: Array<Qualifier> = new Array<Qualifier>();
        JSON.parse(response.json().JsonData).forEach((qualifier) => {
            result.push(CarrierSearchHelper.mapToQualifier(qualifier))
        });
        return result;
    }

    getOperatingCategories() {
        return this._http.get(this._settings.getApiUrl() + 'api/reference-data/operating-categories')
            .map((response) => this.getOperatingCategoriesHandler(response));
    }

    getOperatingCategoriesHandler(response) {
        let result: Array<OperatingCategory> = new Array<OperatingCategory>();
        JSON.parse(response.json().JsonData).forEach((operatingCategory) => {
            result.push(CarrierSearchHelper.mapToOperatingCategory(operatingCategory))
        });
        return result;
    }

    getRestrictions() {
        return this._http.get(this._settings.getApiUrl() + 'api/reference-data/restrictions')
            .map((response) => this.getRestrictionsHandler(response));
    }

    getRestrictionsHandler(response) {
        let result: Array<Restriction> = new Array<Restriction>();
        JSON.parse(response.json().JsonData).forEach((restriction) => {
            result.push(CarrierSearchHelper.mapToRestriction(restriction))
        });
        return result;
    }

    getLegalEntities() {
        return this._http.get(this._settings.getApiUrl() + 'api/reference-data/legal-entities')
            .map((response) => this.getLegalEntitiesHandler(response));
    }

    getLegalEntitiesHandler(response) {
        let result: Array<LegalEntity> = new Array<LegalEntity>();
        JSON.parse(response.json().JsonData).forEach((legalEntity) => {
            result.push(CarrierSearchHelper.mapToLegalEntity(legalEntity))
        });
        return result;
    }

    getRatingAgencies() {
        return this._http.get(this._settings.getApiUrl() + 'api/rating-agencies')
            .map((response) => this.getRatingAgenciesHandler(response));
    }

    getRatingAgenciesHandler(response) {
        let result: Array<RatingAgency> = new Array<RatingAgency>();
        response.json().forEach((ratingAgency) => {
            result.push(CarrierSearchHelper.mapToRatingAgency(ratingAgency))
        });
        return result;
    }

    getLicenceCountries() {
        return this._http.get(this._settings.getApiUrl() + 'api/licenses/countries')
            .map((response) => this.getLicenceCountriesHandler(response));
    }

    getLicenceCountriesHandler(response) {
        let result: Array<Country> = new Array<Country>();
        response.json().forEach((country) => {
            result.push(CarrierSearchHelper.mapToCountry(country))
        });
        return result;
    }


    getLicenceStates(countryId: number) {
        return this._http.get(this._settings.getApiUrl() + 'api/licenses/countries/' + countryId + '/states')
            .map((response) => this.getLicenceStatesHandler(response));
    }

    getLicenceStatesHandler(response) {
        let result: Array<State> = new Array<State>();
        response.json().forEach((state) => {
            result.push(CarrierSearchHelper.mapToState(state))
        });
        return result;
    }

    getLicenceTypes(countryId: number) {
        return this._http.get(this._settings.getApiUrl() + 'api/licenses/countries/' + countryId + '/types')
            .map((response) =>
            this.getLicenceTypesHandler(response));
    }

    getLicenceTypesHandler(response) {
        let result: Array<LicenceType> = new Array<LicenceType>();
        response.json().forEach((licenceType) => {
            result.push(CarrierSearchHelper.mapToLicenceType(licenceType))
        });
        return result;
    }

    // get Rating Agencies
    getRatingAgencyScales(ratingAgencyId: number) {
        return this._http.get(this._settings.getApiUrl() + 'api/rating-agencies/' + ratingAgencyId + '/rating-scales')
            .map((response) => this.getRatingAgencyScalesHandler(response));
    }

    getRatingAgencyScalesHandler(response) {
        let result: Array<RatingAgencyScale> = new Array<RatingAgencyScale>();
        response.json().forEach((ratingAgencyScale) => {
            result.push(CarrierSearchHelper.mapToRatingAgencyScale(ratingAgencyScale))
        });
        return result;
    }

    // get Search Result
    getSearchResult(searchRequest: SearchRequest) {
        let params: URLSearchParams = serializeUrlParams(searchRequest);
        return this._http.get(this._settings.getApiUrl() + 'api/carriers?' + params.toString())
            .map((response) => this.getSearchResultHandler(response));
    }

    getSearchResultHandler(response) {
        let result: Array<Carrier> = new Array<Carrier>();
        response.json().forEach((carrier) => {
            result.push(CarrierSearchHelper.mapToCarrier(carrier))
        });
        return result;
    }
}