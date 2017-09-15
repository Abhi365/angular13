import { Component, OnInit, Input, AfterContentInit, ViewChild } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

import { CarrierDetailsService } from '../carrier-details.service';
import { FinacialService } from './financials.service';

@Component({
  selector: 'app-financials',
  templateUrl: './financials.component.html',
  styleUrls: ['./financials.component.css'],
  providers: [FinacialService]
})
export class FinancialsComponent implements OnInit {
  reportUrl: SafeUrl;
  pdfUrl : SafeUrl;
  excelUrl : SafeUrl;
  selectedReport: string;
  selectedIndex: number;
  selectedHeight: number;
  // disclaimerText: string;
  @ViewChild('disclaimerText') disclaimerText;
  subReports: Array<any> = [{
    reportSubType: 'Assets',
    name: 'Balance Sheet - Assets',
    height: 800
  },
  {
    reportSubType: 'Liabilities',
    name: 'Balance Sheet - Liabilities',
    height: 800
  },
  {
    reportSubType: 'IncomeStatement',
    name: 'Income Statement',
    height: 800
  },
  {
    reportSubType: 'Ratios',
    name: 'Ratios',
    height: 800
  }];

  constructor(private _carrierDetailsService: CarrierDetailsService, private _sanitizer: DomSanitizer, private _finacialService: FinacialService) { 
    this.exportToExcel;
    this.exportToPdf;
  }

  ngOnInit() {
    this.formReportUrl(0);
    this.exportToPdf();
    this.exportToExcel();
    this._finacialService.GetDisclaimer()
      .subscribe((result) => {
        this.disclaimerText.nativeElement.innerHTML = result;
      });
  }

  formReportUrl(index: any) {
    this.selectedIndex = index;
    this.selectedReport = this.subReports[index].name;
    this.selectedHeight = this.subReports[index].height;
    this.reportUrl = this._sanitizer
      .bypassSecurityTrustResourceUrl(this._carrierDetailsService.getReportUrl() +
      'Financials|reportSubType=' + this.subReports[index].reportSubType);
     // console.log(this.reportUrl);
  }
  exportToPdf(){
    // this.pdfUrl = this._sanitizer
    // .bypassSecurityTrustResourceUrl(this._carrierDetailsService.getPdfUrl());
    this.pdfUrl = this._carrierDetailsService.getPdfUrl();
    console.log(this.pdfUrl);
    return this.pdfUrl;
  }
  exportToExcel(){
    // this.excelUrl = this._sanitizer
    // .bypassSecurityTrustResourceUrl(this._carrierDetailsService.getExcelUrl());
    this.excelUrl = this._carrierDetailsService.getExcelUrl();
    console.log(this.excelUrl);
    return this.excelUrl;
  }
}
