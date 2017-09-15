import { Component, OnInit } from '@angular/core';
import { GeneralService } from './general.service';
import { ClientService } from '../../select-client/client.service';
import { Carrier } from '../../carrier-search/carriersearch.model';
import { CarrierDetailsService } from '../carrier-details.service';
import { LoaderService } from '../../shared/loaderComponent/Loader.service';
import { Router } from '@angular/router';
import {
  carrierGeneralInfo, carrierContactDetails, carrierApprovalStatus,
  carrierRatingSummary, carrierApprovalStatusAuditTrail, carrierMainEntity,
  carrierRatingAuditTrail, willisShortNames
} from './general.model';
@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css'],
  providers: [GeneralService]
})
export class GeneralComponent implements OnInit {
  isViewModalData: boolean;
  selectedCarrier: Carrier;
  groupCodeId: string;
  WillisCode: string;
  carrierGeneralInfo: carrierGeneralInfo;
  carrierRatingSummary: carrierRatingSummary;
  ratingAgencyId: string;
  currentCarrierId: number;
  parentCarrierId: number;
  carrierId: number;
  carrierContactDetails: carrierContactDetails;
  country: string;
  state: string;
  type: string;
  group: string;
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
  carrierMainEntityParId; number;
  carrierApprovalStatus: carrierApprovalStatus;
  approvalStatus: string;
  businessUnit: Array<string>;
  restriction: Array<string>;
  qualifiers: Array<string>;
  ratingAgencyName: string;
  ratings: string;
  outLook: string;
  date: string;
  reference: string;
  approvalStatusAuditTrailChangeTypeDesc: string;
  approvalStatusAuditTrailPriorValue: string;
  approvalStatusAuditTrailNewValue: string;
  approvalStatusAuditTrailEffectiveDate: string;
  newAddress: string;
  x : string;
  y : string;
  description: string;
  statementYear: number;
  priorValue: string;
  newValue: string;
  effectiveDate: string;
  businessUnitName: string;
  address: string;
  address1: string;
  address2: string;
  willisShortName: string;
  carrierRatingSummaryResult: Array<carrierRatingAuditTrail>;
  //approvalStatusResult: Array<carrierApprovalStatusAuditTrail>;
  //willisShortNames : Array<willisShortNames>;
  willisShortNames: willisShortNames;
  //carrierRatingSummaryResult: carrierRatingAuditTrail;
  approvalStatusResult: carrierApprovalStatusAuditTrail;
  address3: string;
  add: any;
  n1 : number;n2 : number;n3 : number;n4 : number;n5 : number;n6 : number;n7 : number;n8 : number;n9 : number;
add1 : string; add2: string; add3 : string; add4: string; add5:string;
add6 :string; add7 :  string; add8:string; add9:string; add10:string;

  constructor(private _generalService: GeneralService, private _loaderService: LoaderService, private _clientService: ClientService, private _router: Router) {
  }

  ngOnInit() {
    this.selectedCarrier = this._clientService.getCarriers()[0];
    this.WillisCode = this.selectedCarrier.WillisCode;
    //console.log("Year:"+new Date().getFullYear());
    this.getCarrierGeneralInfo(this.WillisCode, new Date().getFullYear());

  }

  refresh() {
    this.selectedCarrier = this._clientService.getCarriers()[0];
    this.WillisCode = this.selectedCarrier.WillisCode;
    this.getCarrierGeneralInfo(this.WillisCode, new Date().getFullYear());

  }
  getCarrierGeneralInfo(companyCode: string, year: number) {
    this._loaderService.show();
    this._generalService.GetCarrierGeneralInfo(companyCode, year)
      .subscribe(CarrierGeneralInfoResult => {
        this.carrierGeneralInfo = CarrierGeneralInfoResult;
        this.carrierContactDetails = CarrierGeneralInfoResult.carrierContactDetails;
        this.carrierApprovalStatus = CarrierGeneralInfoResult.carrierApprovalStatus;
        this.carrierRatingSummary = CarrierGeneralInfoResult.carrierRatingSummary;
        this.country = this.carrierContactDetails.country;
        this.state = this.carrierContactDetails.state;
        this.type = this.carrierContactDetails.type;
        this.group = this.carrierContactDetails.group;
        this.groupCodeId = this.carrierContactDetails.groupCodeId;
        this.legalName = this.carrierContactDetails.legalName;
        this.carrierMainEntity = this.carrierContactDetails.carrierMainEntity;
        this.fatcaComplianceStatus = this.carrierContactDetails.fatcaComplianceStatus;
        this.fatcaCertificateNumber = this.carrierContactDetails.fatcaCertificateNumber;
        this.fatcaEntityType = this.carrierContactDetails.fatcaEntityType;
        this.willis = this.carrierContactDetails.willis;
        this.fein = this.carrierContactDetails.fein;
        this.naic = this.carrierContactDetails.naic;
        this.lors = this.carrierContactDetails.lors;
        this.fetInd = this.carrierContactDetails.fetInd;
        this.tobaIndicator = this.carrierContactDetails.tobaIndicator;
        this.tobaType = this.carrierContactDetails.tobaType;
        this.legalEntity = this.carrierContactDetails.legalEntity;
        this.fullAddress = this.carrierContactDetails.fullAddress;
        this.establishedDate = this.carrierContactDetails.establishedDate;
        this.operatingCategory = this.carrierContactDetails.operatingCategory;
        this.comments = this.carrierContactDetails.comments;
        this.organizationType = this.carrierContactDetails.organizationType;
        this.marketSecurityContact = this.carrierContactDetails.marketSecurityContact;
        this.marketSecurityAnalyst = this.carrierContactDetails.marketSecurityAnalyst;
        this.carrierMainEntityParId = this.carrierMainEntity[3];

       console.log(this.fullAddress);
        // this.address1 = this.fullAddress.replace(/\|/g, "\n");
        // this.address2 = this.address1.replace(/\:/g, "");
        // this.address3 = this.address2.split('|:|').join("\n");

   // this.address1 = this.fullAddress.replace(/\|/g, ",");
      //  this.address2 = this.address1.replace(/\:/g, ",");
        this.address1 = this.fullAddress.replace(/\|:/g, ",");
        this.address2 = this.address1.replace(/\|/g, ",");
        this.add1 = this.address2.split(",,")[0];
        this.add2 = this.address2.split(",,")[1];
        this.add3 = this.address2.split(",,")[2];
        this.add4 = this.address2.split(",,")[3];
        this.add5 = this.address2.split(",,")[4];
        this.add6 = this.address2.split(",,")[5];
        this.add7 = this.address2.split(",,")[6];
        this.add8 = this.address2.split(",,")[7];
        this.add9 = this.address2.split(",,")[8];
        this.add10 = this.address2.split(",,")[9];

        let str = this.add1;this.n1 = str.search("http");
        if (this.n1 != -1){ this.n1 = 10 }
        let str2 = this.add2;this.n2 = str2.search("http"); 
        if (this.n2 != -1){ this.n2 = 10 }
        let str3 = this.add3;this.n3 = str3.search("http"); 
        if (this.n3 != -1){ this.n3 = 10 }
        if(this.add4 != undefined){
        let str4 = this.add4;this.n4 = str4.search("http"); 
        if (this.n4 != -1){ this.n4 = 10 }}
        if(this.add5 != undefined){
        let str5 = this.add5;this.n5 = str5.search("http"); 
        if (this.n5 != -1){ this.n5 = 10 }}
        if(this.add6 != undefined){
        let str6 = this.add6;this.n6 = str6.search("http");
        if (this.n6 != -1){ this.n6 = 10 }}
        if(this.add7 != undefined){
        let str7 = this.add7;this.n7 = str7.search("http");
        if (this.n7 != -1){ this.n7 = 10 }}
        if(this.add8 != undefined){
        let str8 = this.add8;this.n8 = str8.search("http");
        if (this.n8 != -1){ this.n8 = 10 }}
        if(this.add9 != undefined){
        let str9 = this.add9;this.n9 = str9.search("http");
        if (this.n9 != -1){ this.n9 = 10 }}

        this.approvalStatus = this.carrierApprovalStatus.approvalStatus;
        this.businessUnit = this.carrierApprovalStatus.businessUnit;
        this.restriction = this.carrierApprovalStatus.restriction;
        this.qualifiers = this.carrierApprovalStatus.qualifiers;
        this.comments = this.carrierApprovalStatus.comments;

        this.ratingAgencyId = this.carrierRatingSummary.ratingAgencyId;
        this.ratingAgencyName = this.carrierRatingSummary.ratingAgencyName;
        this.ratings = this.carrierRatingSummary.ratings;
        this.outLook = this.carrierRatingSummary.outLook;
        this.date = this.carrierRatingSummary.date;
        this.reference = this.carrierRatingSummary.reference;
        console.log(this.carrierApprovalStatus);
        
        if (this.businessUnit.length == 0) {
          this.x = 'noShow';
        }
        else {this.x = 'show'};
        if (this.restriction.length == 0) {
          this.y = 'noShow';
        } else {
          this.y ='show';
        }
      }
      

      )
      this._loaderService.hide();

    //this.filterAddress(this.fullAddress)
  }

  // filterAddress(fullAddress) {
  //   this.newAddress = fullAddress.replace("|:|", "\n");
  //   return this.newAddress;

  // }


  getApprovalStatusDetails() {
    this._loaderService.show();
    this.selectedCarrier = this._clientService.getCarriers()[0];
    this.currentCarrierId = this.selectedCarrier.CarrierId;
    this.parentCarrierId = this.carrierGeneralInfo.carrierContactDetails.carrierMainEntity[3];
    if (this.parentCarrierId) {
      this.getCarrierApprovalStatusByCarrierId(this.parentCarrierId);
      // console.log('parentCarrierId');
    }
    else {
      this.getCarrierApprovalStatusByCarrierId(this.currentCarrierId);
      // console.log("carrierId");
    }
    this._loaderService.hide();
  }


  getCarrierApprovalStatusByCarrierId(carrierId: number) {
    this.selectedCarrier = this._clientService.getCarriers()[0];
    this.carrierId = this.selectedCarrier.CarrierId;
    // console.log(carrierId);
    this._generalService.GetCarrierApprovalStatusByCarrierId(carrierId)
      .subscribe(approvalStatusResult => {
        this.approvalStatusResult = approvalStatusResult;
        this.approvalStatusAuditTrailChangeTypeDesc = this.approvalStatusResult.approvalStatusAuditTrailChangeTypeDesc;
        this.approvalStatusAuditTrailPriorValue = this.approvalStatusResult.approvalStatusAuditTrailPriorValue;
        this.approvalStatusAuditTrailNewValue = this.approvalStatusResult.approvalStatusAuditTrailNewValue;
        this.approvalStatusAuditTrailEffectiveDate = this.approvalStatusResult.approvalStatusAuditTrailEffectiveDate;
        // console.log(this.approvalStatusResult);
      })

  }
  getCarrierRatingSummary(ratingAgencyId: number, ratingAgencyName: string) {
    this.selectedCarrier = this._clientService.getCarriers()[0];
    this.carrierId = this.selectedCarrier.CarrierId;
    this.ratingAgencyName = ratingAgencyName;
    this._generalService.GetCarrierRatingSummary(this.carrierId, ratingAgencyId)
      .subscribe((carrierRatingSummaryResult) => {
        let length = carrierRatingSummaryResult.length;
        this.carrierRatingSummaryResult = carrierRatingSummaryResult;
        //  this.description = this.carrierRatingSummaryResult[0].description;
        // this.statementYear = this.carrierRatingSummaryResult[0].statementYear;
        // this.priorValue = this.carrierRatingSummaryResult[0].priorValue;
        // this.newValue = this.carrierRatingSummaryResult[0].newValue;
        // this.effectiveDate = this.carrierRatingSummaryResult[0].effectiveDate;

        // console.log(this.carrierRatingSummaryResult);
      })

  }

  getWillisShortNames() {
    this.selectedCarrier = this._clientService.getCarriers()[0];
    this.carrierId = this.selectedCarrier.CarrierId;
    this._generalService.GetWillisShortNames(this.carrierId)
      .subscribe(willisShortNames => {
        this.willisShortNames = willisShortNames;
        this.willisShortName = this.willisShortNames.willisShortName;
        this.businessUnitName = this.willisShortNames.businessUnitName;
        // console.log(this.willisShortNames);
      })
  }

  Ownership() {
    // console.log("Value of carrierContactdetails:"+this.carrierContactDetails)
    this.selectedCarrier = this._clientService.getCarriers()[0];
    this.carrierId = this.selectedCarrier.CarrierId;
    this._clientService.setOwnership(this.carrierContactDetails.groupCodeId);
    this._router.navigateByUrl('/carrier-search');
  }
}
