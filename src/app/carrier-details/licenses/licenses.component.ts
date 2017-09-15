import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LicensesService } from './licenses.service';
import { ClientService } from '../../select-client/client.service';
import { Carrier, Country, BusinessUnit } from '../../carrier-search/carriersearch.model';
import { CarrierDetailsService } from '../carrier-details.service';
import { licenseBusinessType, licenseState } from './licenses.model';
// import { carrierContactDetails} from './general.model';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.css'],
  providers: [LicensesService]
})

export class LicensesComponent implements OnInit {
  selectedCarrier: Carrier;
  countryName: string;
  carrierId: number;
  countryCode: string;
  WillisCode: string;
  description: string;
  licenseGradeID: string;
  website: string;
  countrySubName: string;
  countrySubCode: string;
  isState: boolean;
  licenseGradeId: number;
  businessTypeId: number;
  isLicensesSection = false;
  mainSection = true;
  licensevalue: licenseState;
  pagevalue : licenseBusinessType;
  licenseTypesResult: Array<licenseBusinessType>;
  licenseGradesResult: Array<licenseState>;
  licenseID : number;
  websiteLink : string;

  constructor(private _licensesService: LicensesService, private _clientService: ClientService,
    private _router: Router) {
  }

  ngOnInit() {
    this.isLicensesSection = false;
    this.mainSection = true;
    this.selectedCarrier = this._clientService.getCarriers()[0];
    // console.log(this.selectedCarrier);
    this.carrierId = this.selectedCarrier.CarrierId;
    this.countryName = this.selectedCarrier.Country;
    if (this.selectedCarrier.Country == 'United States') {
      this.getLicenseTypes(this.carrierId, 'US');
      this.getLicenseGrades(this.carrierId, 'US');
    }
    else if (this.selectedCarrier.Country == 'Canada'){
      this.getLicenseTypes(this.carrierId, 'CA');
      this.getLicenseGrades(this.carrierId, 'CA');
    }
    else {
      this.getLicenseTypes(this.carrierId, 'MP');
      this.getLicenseGrades(this.carrierId, 'MP');
    }
  }

  getLicenseTypes(carrierId: number, countryCode: string) {
    this.selectedCarrier = this._clientService.getCarriers()[0];
    this.carrierId = this.selectedCarrier.CarrierId;
    this._licensesService.GetLicenseTypes(carrierId, countryCode)
      .subscribe(licenseTypesResult => {
        this.licenseTypesResult = licenseTypesResult;
      })
  }
  getLicenseGrades(carrierId: number, countryCode: string) {
    this.selectedCarrier = this._clientService.getCarriers()[0];
    this.carrierId = this.selectedCarrier.CarrierId;
    this._licensesService.GetLicenseGrades(carrierId, countryCode)
      .subscribe(licenseGradesResult => {
        this.licenseGradesResult = licenseGradesResult;
      })
  }

  openLicenseSection() {
    this.isLicensesSection = true;
    this.mainSection = false;
  }

  showView(index: number) {
    this.licensevalue = this.licenseGradesResult[index];
    this.website = this.licensevalue.Website;
    this.websiteLink = 'http://'+this.website;
  }
  showPage(index : number){
    this.pagevalue = this.licenseTypesResult[index];
    this.licenseID = this.pagevalue.LicenseGradeId;
    ///debugger
    this._clientService.setLicensed(this.licenseID);
    //debugger
    this._router.navigateByUrl('/carrier-search');
  }


  setCountryStateFlag() {
    this._clientService.setLicenseState(this.licensevalue);
    this._router.navigateByUrl('/carrier-search');
  }

  goBacktoLicenses() {
    this.isLicensesSection = false;
    this.mainSection = true;
    this.selectedCarrier = this._clientService.getCarriers()[0];
    console.log(this.selectedCarrier);
    this.carrierId = this.selectedCarrier.CarrierId;
    this.countryName = this.selectedCarrier.Country;
    if (this.selectedCarrier.Country == 'United States') {
      this.getLicenseTypes(this.carrierId, 'US');
      this.getLicenseGrades(this.carrierId, 'US');
    }
    else if (this.selectedCarrier.Country == 'Canada'){
      this.getLicenseTypes(this.carrierId, 'CA');
      this.getLicenseGrades(this.carrierId, 'CA');
    }
    else {
      this.getLicenseTypes(this.carrierId, 'MP');
      this.getLicenseGrades(this.carrierId, 'MP');
    }
  }
  goBacktoLicensesCanada() {
    this.isLicensesSection = false;
    this.mainSection = true;
    this.selectedCarrier = this._clientService.getCarriers()[0];
    console.log(this.selectedCarrier);
    this.carrierId = this.selectedCarrier.CarrierId;
    this.countryName = this.selectedCarrier.Country;
    this.getLicenseTypes(this.carrierId, 'CA');
    this.getLicenseGrades(this.carrierId, 'CA');
  }
}