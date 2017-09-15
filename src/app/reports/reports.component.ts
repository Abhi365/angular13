import { Component, OnInit } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import { LoggedInUser } from '../shared/loggedInUser/LoggedInUser';


// import { Settings } from '../shared/settings/settings.service';

import { Settings } from '../shared/settings/settings.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers: [LoggedInUser]

})
export class ReportsComponent {
  reportUrl: SafeUrl;
  reportWidth: number;
  reportHeight: number;
  isReportsActive: boolean;
  reports: Array<any> = [
  {
    ReportName: "AuditTrail", ReportDescription: "Audit Trail Changes", Width: 100, Height: 650
  },
    {
    ReportName: "ApprovedList", ReportDescription: "Approved List", Width: 100, Height: 650
  },
  {
    ReportName: "CarrierApproval", ReportDescription: "Carrier Approval Status Reports", Width: 100, Height: 650
  },
   {
    ReportName: "OperatingStatus", ReportDescription: "Operating Status/Company Type Report", Width: 100, Height: 650
  },
  {
    ReportName: "GroupReport", ReportDescription: "Group Report", Width: 100, Height: 650
  },
  {
    ReportName: "RatingsUpdate", ReportDescription: "Rating Update Report", Width: 100, Height: 650
  },
 {
    ReportName: "MarketingReport", ReportDescription: "Marketing Report - Comparative Ratings", Width: 100, Height: 650
  }];
   MsdReports: Array<any> = [{
    ReportName: "AdminCode", ReportDescription: "Administration Code Report", Width: 100, Height: 650
  },
  {
    ReportName: "MarketComparision", ReportDescription: "Market Comparison Report", Width: 100, Height: 650
  },
  {
    ReportName: "RatingAgency", ReportDescription: "Rating Agency Code Report", Width: 100, Height: 650
  }];


  constructor(private _router: Router, private _activatedRoute: ActivatedRoute,
    private _settings: Settings, private _sanitizer: DomSanitizer, private _loggedInUser: LoggedInUser) {
    this.showReport();
    /*
    this._activatedRoute.queryParams
      .switchMap((params: ParamMap) => Observable.of(params))
      .subscribe((reportCode) => console.log(reportCode));
      */
  }

  showReport() {
    if (this._activatedRoute.snapshot.paramMap.get('reportName') !== null) {
      this.isReportsActive = true;
      this.reportUrl = this._sanitizer
        .bypassSecurityTrustResourceUrl(this._settings.getReportsUrl() + 'adminreport/ViewReport/'
        + this._activatedRoute.snapshot.paramMap.get('reportName'));
    } else {
      this.isReportsActive = false;
    }
  }

  getReport(index: any) {
    let report = this.reports[index];
    this._router.navigate(['/admin-reports', report.ReportName]);
    // this._router.navigate(['/admin-reports', {reportName: report.ReportName}]);
  }
   getMsdReport(index: any) {
    let MsdReport = this.MsdReports[index];
    this._router.navigate(['/admin-reports', MsdReport.ReportName]);
  }
}
