import { Component, OnInit, Input, AfterContentInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
import { LoaderService } from '../../shared/loaderComponent/Loader.service';
import { SummaryService } from './summary.service';
import { ClientService } from '../../select-client/client.service';
import { Account } from '../../select-client/select-client.model';
import { Carrier } from '../../carrier-search/carriersearch.model';
import { CarrierDetailsService } from '../carrier-details.service';
import { ReferenceCode, CreateReferenceCode } from './summary.model';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { FinacialService } from '../financials/financials.service';
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  providers: [SummaryService, FinacialService]
})
export class SummaryComponent implements OnInit {
  @ViewChild('disclaimerText') disclaimerText;
  selectedCarrier: Carrier;
  selectedAccount: Account;
  carrierId: number;
  referenceResult: ReferenceCode;
  accountId: string;
  clientRefResult: CreateReferenceCode;
  message: string;
  isSuccess: boolean;
  isError: boolean;
  ref: string;
  summarytext: string;
  valueAM: string;
  valueSnP: string;
  reportUrl: SafeUrl;
  AMGraphUrl: SafeUrl;
  SnPGraphUrl: SafeUrl;
  selectedHeight1: number;
  selectedHeight2: number;
  selectedHeight3: number;
  HideTablix: number;
  show: boolean;
  pdfUrl : SafeUrl;
  excelUrl : SafeUrl;

  constructor(private _summaryService: SummaryService, private _finacialService: FinacialService,  private _clientService: ClientService,
    private _loaderService: LoaderService, private _carrierDetailsService: CarrierDetailsService, private _sanitizer: DomSanitizer) {
    this.ref = '';
    this.HideTablix = 1;
    this.valueAM = 'Show';
    this.valueSnP = 'Show';
    this.show = false;
    this.exportToExcel;
    this.exportToPdf;
  }

  ngOnInit() {
    this.exportToPdf();
    this.exportToExcel();
    this.formReportUrl();
    this.formAMGraphUrl(this.HideTablix);
    this.formSnPGraphUrl(this.HideTablix);
    this._finacialService.GetDisclaimer()
    .subscribe((result) => {
      this.disclaimerText.nativeElement.innerHTML = result;
    });

    this.selectedCarrier = this._clientService.getCarriers()[0];
    this.selectedAccount = this._clientService.getSelectedAccount();
    this.accountId = this.selectedAccount.Id;
    this.carrierId = this.selectedCarrier.CarrierId;
    // this.GetReferenceCodeByAccountIdAndCarrierId('7B4163C1-02C9-4B84-85D5-3BCF73BCD13B', this.carrierId);
    this.GetReferenceCodeByAccountIdAndCarrierId(this.accountId, this.carrierId);
  }


  GetReferenceCodeByAccountIdAndCarrierId(accountId: string, carrierId: number) {
    // this._loaderService.show();
    this.isSuccess = false;
    this.isError = false;
    this._summaryService.GetReferenceCodeByAccountIdAndCarrierId(accountId, carrierId)
      .subscribe(referenceResult => {
        this.referenceResult = referenceResult;
        this.summarytext = this.referenceResult.Code;
      })
  }
  saveData() {
    this.isSuccess = false;
    this.isError = false;

    this.ref = this.summarytext;
    this.selectedCarrier = this._clientService.getCarriers()[0];
    this.selectedAccount = this._clientService.getSelectedAccount();
    this.accountId = this.selectedAccount.Id;
    this.carrierId = this.selectedCarrier.CarrierId;
    this._summaryService.PostReferenceCode(this.accountId, this.carrierId, this.ref)
      .subscribe((clientRefResult) => {
        if (clientRefResult) {
          this.showSuccess('Client Reference created successfully');
        }
        else
          this.showError('Creation of Client Reference Failed');
      }, (error) => this.handleError(error));
  }

  showSuccess(message: string) {
    this.message = message;
    this.isSuccess = true;
  }

  showError(message: string) {
    this.isError = true;
    this.message = message;
  }
  handleError(error) {
    this.showError('Some Error Occured, please report to support team along with steps to reproduce');
  }
  formReportUrl() {
    this.selectedHeight1 = 870;
    this.reportUrl = this._sanitizer
      .bypassSecurityTrustResourceUrl(this._carrierDetailsService.getSummaryUrl());
  }

  formAMGraphUrl(HideTablix: number) {
    this.selectedHeight2 = 305;
    this.AMGraphUrl = this._sanitizer
      .bypassSecurityTrustResourceUrl(this._carrierDetailsService.getFormAMGraphUrl(HideTablix));
  }

  formSnPGraphUrl(HideTablix: number) {
    this.selectedHeight3 = 360;
    this.SnPGraphUrl = this._sanitizer
      .bypassSecurityTrustResourceUrl(this._carrierDetailsService.getFormSnPGraphUrl(HideTablix));
  }
  formAMGraphUrl2(HideTablix: number) {
    this.selectedHeight2 = 305;
    this.AMGraphUrl = this._sanitizer
      .bypassSecurityTrustResourceUrl(this._carrierDetailsService.getFormAMGraphUrl2(HideTablix));
  }

  formSnPGraphUrl2(HideTablix: number) {
    this.selectedHeight3 = 360;
    this.SnPGraphUrl = this._sanitizer
      .bypassSecurityTrustResourceUrl(this._carrierDetailsService.getFormSnPGraphUrl2(HideTablix));
  }

  hideAMReport() {
    this.show = !this.show;
    if (this.show == true) {
      this.valueAM = 'Hide';
      this.formAMGraphUrl2(this.HideTablix);
    } else {
      this.valueAM = 'Show';
      this.HideTablix = 0;
      this.formAMGraphUrl(this.HideTablix);
    }
  }
  hideSnPReport() {
    this.show = !this.show;
    if (this.show == true) {
      this.valueSnP = 'Hide';
      this.formSnPGraphUrl2(this.HideTablix);
    }
    else {
      this.valueSnP = 'Show';
      this.HideTablix = 0;
      this.formSnPGraphUrl(this.HideTablix);
    }
  }
  exportToPdf(){
    this.pdfUrl = this._carrierDetailsService.getPdfUrl();
    //console.log(this.pdfUrl);
    return this.pdfUrl;
  }
  exportToExcel(){
    this.excelUrl = this._carrierDetailsService.getExcelUrl();
   // console.log(this.excelUrl);
    return this.excelUrl;
  }
}

