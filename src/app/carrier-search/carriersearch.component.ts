import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';


import { Account } from '../select-client/select-client.model';
import { ClientService } from '../select-client/client.service';
import { UserRole } from '../shared/model/model';
import { LoggedInUser } from '../shared/loggedInUser/LoggedInUser';
import { LoaderService } from '../shared/loaderComponent/Loader.service';

// import { Ng2TableModule } from 'ng2-table/ng2-table';
import { GridOptions } from "ag-grid";
import { LinkComponent } from './link-component/link-component.component';
import { CheckComponent } from './check/check.component';

import { searchResult } from './carriersearch.mock.data';
import { CarrierSearchService } from './carriersearch.service';
import {
  ApprovalStatus, BusinessUnit, CompanyType, Country, LegalEntity, LicenceType,
  OperatingCategory, Ownership, Qualifier, Restriction, State, Carrier, SearchRequest, RatingAgency,
  RatingAgencyScale
} from './carriersearch.model'

@Component({
  selector: 'app-carriersearch',
  templateUrl: './carriersearch.component.html',
  styleUrls: ['./carriersearch.component.css'],
  providers: [CarrierSearchService]
})
export class CarriersearchComponent implements OnInit {
  isClientSelected = false;
  isTableSelected = false;
  group1: string;
  url = 'url';
  selectedAccount: Account;
  isClientReader: boolean;
  selectAllRows: boolean;
  message: string;
  isSuccess: boolean;
  isError: boolean;
  IntersectionObserverEntry
  gridResult: Array<Carrier>;
  gridOptions: GridOptions;

  searchRequest: SearchRequest;
  states: Array<State>;
  licenceStates: Array<State>;
  approvalStatus: Array<ApprovalStatus>;
  businessUnits: Array<BusinessUnit>;
  companyTypes: Array<CompanyType>;
  countries: Array<Country>;
  licenceCountries: Array<Country>;
  legalEntities: Array<LegalEntity>;
  licenceTypes: Array<LicenceType>;
  operatingCategories: Array<OperatingCategory>;
  ownerships: Array<Ownership>;
  qualifiers: Array<Qualifier>;
  restrictions: Array<Restriction>;
  ratingAgencies: Array<RatingAgency>;
  ratingAgencyScales: Array<RatingAgencyScale>;
  CountryId: number;
  LicenseCountryId: number;

  redirectToClientMaintenanceFlag: boolean;

  constructor(private _router: Router, private _loggedInUser: LoggedInUser,
    private _clientService: ClientService, private _loaderService: LoaderService,
    private _carrierSearchService: CarrierSearchService) {

    this.loadtable();
    this.initialization();
  }

  ngOnInit() {
    this.selectedAccount = this._clientService.getSelectedAccount();
    this.searchRequest.ClientId = this.selectedAccount.Id;
    this.checkIfClientReader();
    this.redirectToClientMaintenanceFlag = this._clientService.getRedirectToClientMaintenance();
    if (!this.redirectToClientMaintenanceFlag)
      this.findresults2();

    else {
      this.searchRequest.Mode = 'CM';
    }

    // Check Country and State flag
    let liceseState = this._clientService.getLicenseState();
    this._clientService.setLicenseState(null);
    if (liceseState !== undefined && liceseState !== null) {
      //replace this later, for now default US
      this.searchRequest.CountryId = 840;
      this.getState(this.searchRequest.CountryId);
      this.searchRequest.CountrySubId = liceseState.CountrySubId;
    }

    //check Ownership Flag
    let ownership = this._clientService.getOwnership();
    this._clientService.setOwnership(null);
    if (ownership !== undefined && ownership !== null) {
      this.getOwnerships();
      this.searchRequest.GroupCodeId = ownership;
    }


    // Flag for License Type
    let licenseType = this._clientService.getLicensed();
    this._clientService.setLicensed(null);
    if (licenseType !== undefined && licenseType !== null) {
      this.searchRequest.LicenseCountryId = 840;
      this.getLicenceTypes(this.searchRequest.LicenseCountryId);
      this.searchRequest.LicenseCodeId = licenseType;
    }
    //this.reset2();
  }


  initialization() {
    this.ownerships = [];
    this.isClientSelected = true;
    this.isTableSelected = false;
    this.selectAllRows = false;
    this.getCountry();
    this.getApprovalStatus();

    this.getCompanyType();
    this.getBusinessUnit();
    this.getOperatingCategory();
    this.getRestriction();
    this.getLegalEntity();
    this.getRatingAgencies();
    this.getLicenceCountry();
    this.getQualifier();
    this.reset();

  }
  loadtable() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.enableSorting = true;
    this.gridOptions.rowHeight = 70;
    this.gridOptions.headerHeight = 70;
    this.gridOptions.columnDefs = [
      {
        headerName: "",
        width: 40,
        cellStyle: { 'white-space': 'normal' },
        checkboxSelection: true,
        headerCheckboxSelection: true
      },
      {
        headerName: "Legal Name",
        valueGetter: "data.LegalName",
        cellRendererFramework: LinkComponent,
        width: 110,
        cellStyle: { 'white-space': 'normal' }
      },
      {
        headerName: "Match Type",
        valueGetter: "data.MatchType",
        width: 50,
        cellStyle: { 'white-space': 'normal' }
      },
      {
        headerName: "Country",
        valueGetter: "data.Country",
        width: 70,
        cellStyle: { 'white-space': 'normal' }
      },
      {
        headerName: "State",
        valueGetter: "data.State",
        width: 50,
        cellStyle: { 'white-space': 'normal' }
      },
      {
        headerName: "Company Type",
        valueGetter: "data.CompanyType",
        width: 75,
        cellStyle: { 'white-space': 'normal' }
      },
      {
        headerName: "WTW Code",
        valueGetter: "data.WillisCode",
        width: 55,
        cellStyle: { 'white-space': 'normal' }
      },
      {
        headerName: "LORS Code",
        valueGetter: "data.LorsCode",
        width: 55,
        cellStyle: { 'white-space': 'normal' }
      },
      {
        headerName: "NAIC Code",
        valueGetter: "data.NaicCode",
        width: 55,
        cellStyle: { 'white-space': 'normal' }
      },
      {
        headerName: "FEIN / AIIN Code",
        valueGetter: "data.FeinCode",
        width: 50,
        cellStyle: { 'white-space': 'normal' }
      },
      {
        headerName: "A.M. BEST",
        valueGetter: "data.AMBest",
        width: 55,
        cellStyle: { 'white-space': 'normal' }
      },
      {
        headerName: "S&P",
        valueGetter: "data.SnP",
        width: 55,
        cellStyle: { 'white-space': 'normal' }
      },
      {
        headerName: "Moody's",
        valueGetter: "data.Moodys",
        width: 55,
        cellStyle: { 'white-space': 'normal' }
      },
      {
        headerName: "Fitch",
        valueGetter: "data.Fitch",
        width: 50,
        cellStyle: { 'white-space': 'normal' }
      },
      {
        headerName: "PHF / SHF Capacity",
        valueGetter: "data.PHSCapacity",
        width: 65,
        cellStyle: { 'white-space': 'normal' }
      },
      {
        headerName: "As at Date",
        valueGetter: "data.AsAtDate",

        width: 50,
        cellStyle: { 'white-space': 'normal' }
      },
      {
        headerName: "NWP",
        valueGetter: "data.NWP",

        width: 50,
        cellStyle: { 'white-space': 'normal' }
      },
      {
        headerName: "Combined Ratio %",
        valueGetter: "data.CombinedRatioPercentage",
        width: 80,
        cellStyle: { 'white-space': 'normal' }
      },
      {
        headerName: "Approval Status",
        valueGetter: "data.ApprovalStatus",
        cellRendererFramework: CheckComponent,
        width: 70,
        cellStyle: { 'white-space': 'normal' }
      },
      {
        headerName: "Sanction Status",
        valueGetter: "data.SanctionStatus",
        cellRendererFramework: CheckComponent,
        width: 65,
        cellStyle: { 'white-space': 'normal' }
      },
      {
        headerName: "TOBA End date",
        valueGetter: "data.TOBAEndDate",
        cellRendererFramework: CheckComponent,
        width: 50,
        cellStyle: { 'white-space': 'normal' }
      },
      {
        headerName: "TOBA Indicator",
        valueGetter: "data.TOBAIndicator",
        cellRendererFramework: CheckComponent,
        width: 65,
        cellStyle: { 'white-space': 'normal' }
      },
      ,
      {
        headerName: "FATCA Status",
        valueGetter: "data.FATCAStatus",
        width: 50,
        cellStyle: { 'white-space': 'normal' }
      }
    ];
    //this.gridOptions.rowData=[];
  }
  reset() {
    let clientId = (this.searchRequest !== undefined ? this.searchRequest.ClientId : null);
    this.searchRequest = new SearchRequest();
    this.searchRequest.ClientId = clientId;
    this.searchRequest.LegalNameOperator = '1';
    this.searchRequest.RatingAgencyOperator = '0';
    this.gridResult = new Array<Carrier>();
    //this.gridOptions.rowData=[];
    //
    // put reset code for Code field
    // this.searchRequest.
  }

  reset2() {
    let clientId = (this.searchRequest !== undefined ? this.searchRequest.ClientId : null);
    this.searchRequest = new SearchRequest();
    this.searchRequest.ClientId = clientId;
    this.searchRequest.LegalNameOperator = '1';
    this.searchRequest.RatingAgencyOperator = '0';
    this.gridResult = new Array<Carrier>();
    this.gridOptions.api.setRowData([]);
  }
  findresults() {
    this._loaderService.show();
    console.log(this.searchRequest);
    this._carrierSearchService.getSearchResult(this.searchRequest)
      .subscribe((result) => {
        this.gridResult = result;
        console.log("this.gridOptions.api:" + this.gridOptions.api);
        if (this.gridOptions.api != null) {
          this.gridOptions.api.setRowData(result);
        }
        else {
          this.gridOptions.rowData = result;
        }
        this.isTableSelected = true;
        this._loaderService.hide();
      },
      (error) => this.handleError(error));
  }
  findresults2() {
    this._loaderService.show();
    console.log(this.searchRequest);
    this._carrierSearchService.getSearchResult(this.searchRequest)
      .subscribe((result) => {
        this.gridResult = result;
        this.gridOptions.rowData = result;
        //this.gridOptions.api.setRowData(result);
        console.log(this.gridOptions.rowData);
        this.isTableSelected = true;
        this._loaderService.hide();
      },
      (error) => this.handleError(error));
  }

  selectAllRowsClick() {
    this.gridResult.forEach((carrier) => carrier.select = this.selectAllRows);
  }



  naviagateToCarrierDetail(index: number) {
    let carriers: Array<Carrier> = new Array<Carrier>();
    carriers.push(this.gridResult[index])
    this._clientService.setCarriers(carriers);
    this._router.navigateByUrl('/carrier-detail');
    console.log(carriers[0].Country);
    if (carriers[0].Country == 'United States' || carriers[0].Country == 'Canada') {
      this._router.navigate(['carrier-detail', 0])
    } else
      this._router.navigate(['carrier-detail', 1])

  }

  getCountry() {
    this._carrierSearchService.getCountries()
      .subscribe((result) => {
        this.countries = result;
      }, (error) => this.handleError(error));

  }

  getState(countryId: number) {
    if (countryId) {
      this._loaderService.show();
      this._carrierSearchService.getStates(countryId)
        .subscribe((result) => {
          this.states = result;
          this._loaderService.hide();
        },
        (error) => this.handleError(error));
    } else {
      this.searchRequest.CountrySubId = null;
      this.searchRequest.CountryId = null;
      this.states = [];
    }

  }

  getLicenceCountry() {
    this._carrierSearchService.getCountries()
      .subscribe((result) => {
        this.licenceCountries = result;
      }, (error) => this.handleError(error));
  }

  licenceCountryChange(countryId: number) {
    this.getLicenceState(countryId);
    this.getLicenceTypes(countryId);
    if (countryId == 0 || countryId == null) {
      this.searchRequest.LicenseCodeId = null;
      this.searchRequest.LicenseStateId = null;
      this.searchRequest.LicenseCountryId = null;
    }

  }


  getLicenceState(countryId: number) {
    if (countryId) {
      this._carrierSearchService.getStates(countryId)
        .subscribe((result) => {
          this.licenceStates = result;
        },
        (error) => this.handleError(error));
    } else {
      this.searchRequest.CountrySubId = null;
      this.licenceStates = [];
    }
  }

  getLicenceTypes(countryId: number) {
    if (countryId) {
      this._loaderService.show();
      this._carrierSearchService.getLicenceTypes(countryId)
        .subscribe((result) => {
          // let result1 = JSON.stringify(result)
          // console.log("LicenceType Result :" + result1);
          this.licenceTypes = result;
          this._loaderService.hide();
        }, (error) => this.handleError(error));
    } else {
      this.licenceTypes = [];
    }
  }

  getApprovalStatus() {
    this._carrierSearchService.getApprovalStatus()
      .subscribe((result) => this.approvalStatus = result,
      (error) => this.handleError(error));
  }

  getOwnerships() {
    this._carrierSearchService.getOwnerships()
      .subscribe((result) => this.ownerships = result,
      (error) => this.handleError(error));
  }

  getCompanyType() {
    this._carrierSearchService.getCompanyTypes()
      .subscribe((result) => this.companyTypes = result,
      (error) => this.handleError(error));
  }

  getBusinessUnit() {
    this._carrierSearchService.getBusinessUnits()
      .subscribe((result) => this.businessUnits = result,
      (error) => this.handleError(error));
  }

  getQualifier() {
    this._loaderService.show();
    this._carrierSearchService.getQualifiers()
      .subscribe((result) => {
        this.qualifiers = result;
        if (this.redirectToClientMaintenanceFlag)
          this._loaderService.hide();
      },
      (error) => this.handleError(error));
  }

  getOperatingCategory() {
    this._carrierSearchService.getOperatingCategories()
      .subscribe((result) => this.operatingCategories = result,
      (error) => this.handleError(error));
  }

  getRestriction() {
    this._carrierSearchService.getRestrictions()
      .subscribe((result) => this.restrictions = result,
      (error) => this.handleError(error));
  }

  getLegalEntity() {
    this._carrierSearchService.getLegalEntities()
      .subscribe((result) => this.legalEntities = result,
      (error) => this.handleError(error));
  }

  getRatingAgencies() {
    this._carrierSearchService.getRatingAgencies()
      .subscribe((result) => {
        this.ratingAgencies = result;
      },
      (error) => {
        console.log('Rating Agencies Error');
        this.handleError(error);
      });
  }

  getRatingAgencyScales(ratingAgencyId: number) {
    if (ratingAgencyId) {
      this._carrierSearchService.getRatingAgencyScales(ratingAgencyId)
        .subscribe((result) => this.ratingAgencyScales = result,
        (error) => this.handleError(error));
    } else {
      this.searchRequest.CountrySubId = null;
      this.searchRequest.RatingAgencyId = null;
      this.searchRequest.RatingRange = null;
      this.ratingAgencyScales = [];
    }
  }


  selectclient() {
    this._clientService.setChangeSelectedClient(true);
    this._clientService.setRevertUrl(this._router.url);
    this._router.navigateByUrl('/select-client');
  }



  checkIfClientReader() {
    this.isClientReader = (this._loggedInUser.getRole().getRank() === UserRole.ClientReader);
  }

  handleError(error) {
    // this.showError('Some Error Occured, please report to support team along with steps to reproduce');
    this.showError('Timeout Error. The result you requested is taking too long to respond. Try Again');
  }

  showSuccess(message: string) {
    this.message = message;
    this.isSuccess = true;
  }

  showError(message: string) {
    this.isError = true;
    this.message = message;
    this._loaderService.hide();
  }

  redirectToPrevious(page: string) {
    
    let selectedCarriers: Array<Carrier> = this.gridOptions.api.getSelectedRows();
    // let selectedCarriers: Array<Carrier> = this.gridResult.filter((carrier) => carrier.select == true);
    this._clientService.setCarriers(selectedCarriers);
    switch (page) {
      case 'client-maintenance':
        //this._clientService.setCarriers()
        this._clientService.setRedirectToClientMaintenance(false);

        break;
    }
    this._router.navigateByUrl('/' + page);
  }

  changeCode(CodeSelection: string) {
    if (CodeSelection == '') {
      this.searchRequest.CodeSelection = null;
    }
  }

  changeCategory(CategoryId: number) {
    if (CategoryId == 0 || CategoryId == null) {
      this.searchRequest.CategoryId = null;
    }
  }

  onChangeState(CountrySubId: number) {
    if (CountrySubId == 0 || CountrySubId == null) {
      this.searchRequest.CountrySubId = null;
    }
  }
  onFavourites(CarrierFavoriteId: number) {
    if (CarrierFavoriteId == 0 || CarrierFavoriteId == null) {
      this.searchRequest.CarrierFavoriteId = null;
    }
  }
  onOwnershipChange(GroupCodeId: number) {
    if (GroupCodeId == 0 || GroupCodeId == null) {
      this.searchRequest.GroupCodeId = null;
    }
  }
  onCompanyTypeChange(CompanyTypeId: number) {
    if (CompanyTypeId == 0 || CompanyTypeId == null) {
      this.searchRequest.CompanyTypeId = null;
    }
  }
  onOperatingChange(CarrierStatusId: number) {
    if (CarrierStatusId == 0 || CarrierStatusId == null) {
      this.searchRequest.CarrierStatusId = null;
    }
  }
  onRatingRangeChange(RatingRange: number) {
    if (RatingRange == 0 || RatingRange == null) {
      this.searchRequest.RatingRange = null;
    }
  }
  onApprovalStatusChange(ApprovalStatusId: number) {
    if (ApprovalStatusId == 0 || ApprovalStatusId == null) {
      this.searchRequest.ApprovalStatusId = null;
    }
  }
  onRestrictionChange(ResctrictionCodeId: number) {
    if (ResctrictionCodeId == 0 || ResctrictionCodeId == null) {
      this.searchRequest.ResctrictionCodeId = null;
    }
  }
  onQualifierChange(QualifierId: number) {
    if (QualifierId == 0 || QualifierId == null) {
      this.searchRequest.QualifierId = null;
    }
  }
  onBUChange(BusinessUnitId: number) {
    if (BusinessUnitId == 0 || BusinessUnitId == null) {
      this.searchRequest.BusinessUnitId = null;
    }
  }
  onTobaChange(TobaIndicator: string) {
    if (TobaIndicator == '') {
      this.searchRequest.TobaIndicator = null;
    }
  }
  onLEChange(LegalEntity: number) {
    if (LegalEntity == 0 || LegalEntity == null) {
      this.searchRequest.LegalEntity = null;
    }
  }
  onLicenseStateChange(LicenseStateId: number) {
    if (LicenseStateId == 0 || LicenseStateId == null) {
      this.searchRequest.LicenseStateId = null;
    }

  }
  goToCarrierFavorites(){
    this._router.navigateByUrl('/carrier-favorites');
  }
}
