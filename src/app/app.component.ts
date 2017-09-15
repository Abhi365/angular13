import { Component, Inject, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoggedInUser } from './shared/loggedInUser/LoggedInUser';
import { LoaderService } from './shared/loaderComponent/Loader.service';
import { Settings } from './shared/settings/settings.service';
import { Http } from '@angular/http';
/*import {jQuery} from 'jquery';
declare var $:jQuery;*/
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {

  @ViewChild('hoverElem') el: ElementRef;
  @ViewChild('activeme') el2: ElementRef;
  active = 'Market Security';
  passive = 'Market Security Admin';
  isAdminActive = false;
  isUserActive = true;
  dropdownOpen = false;
  url = 'url';
  activeUrl: string;
  headervalue;
  isLoading: boolean;

  constructor( @Inject(DOCUMENT) private document: any, private _router: Router,
    private _loggedInUser: LoggedInUser, private _loaderService: LoaderService,
    private _http: Http, private _settings: Settings) {
    this.hitme();
    this._loaderService.showLoader
      .subscribe((result) => {
        this.isLoading = result;
      })

    this._router.events.subscribe(() => this.hitme());

  }

  ngOnDestroy(): void {
    this._loaderService.showLoader.unsubscribe();
  }

  ngAfterViewInit() {
    $('#hoverElem').hover(
      () => {
        $('.nav-vertical-submenu').addClass('active');
      },
      () => {
        $('.nav-vertical-submenu').removeClass('active');
      }
    );
    $('#activeme').hover(
      () => {
        $('.nav-vertical-submenu').addClass('active');
      },
      () => {
        $('.nav-vertical-submenu').removeClass('active');
      }
    );
  }

  menutoggle() {
    $('.navbar-toggler').toggleClass("opentime closedtime");
    $('.nav-mobile-text').toggleClass("hidden-sm-down hidden-sm-up");
  }


  hitme() {
    this.url = this.document.location.href;
    this.activeUrl = this.url.substring(this.url.lastIndexOf('/') + 1);

    // console.log('matches ratings: '+this.url.endsWith('ratings'));
    if (this.url.endsWith('home') || this.url.endsWith('carrier-search') ||this.url.endsWith('carrier-favorites') ||
      this.url.endsWith('notification') || this.url.endsWith('carrier-doc') || this.url.endsWith('select-client') || this.url.endsWith('general') || this.url.endsWith('summary') || this.url.endsWith('financials') || this.url.endsWith('documents')|| this.url.endsWith('licenses')) {
      this.passive = 'Market Security Admin';
      this.active = 'Market Security';
      this.isAdminActive = false;
      this.isUserActive = true;

    }
    else {
      this.active = 'Market Security Admin';
      this.passive = 'Market Security';
      this.isAdminActive = true;
      this.isUserActive = false;
    }

    if (this.url.endsWith('home') || this.url.endsWith('#') || this.url.endsWith('')) {
      this.headervalue = 'Welcome To Market Security';
    }

    if (this.url.endsWith('msHome')) {
      this.headervalue = 'Market Security Admin';
    }
    if (this.url.endsWith('disclaimers')) {
      this.headervalue = 'Disclaimers';
    }
    if (this.url.endsWith('ratings')) {
      this.headervalue = 'Rating Scale';
    }
    if (this.url.endsWith('edit-user')) {
      this.headervalue = 'User Maintenance';
      // if (this._router.isActive(this.activeUrl, false)) {
      //   window.location.reload();
      // }
    }
    if (this.url.endsWith('announcements')) {
      this.headervalue = 'Announcements';
    }
    if (this.url.endsWith('carrier-search')) {
      this.headervalue = 'Carrier Search';
    }
    if (this.url.endsWith('notification')) {
      this.headervalue = 'Client Notification';
    }
    if (this.url.endsWith('carrier-doc')) {
      this.headervalue = 'Client Documents';
    }
    if (this.url.endsWith('home-page-admin')) {
      this.headervalue = 'Home Page - Admin';
    }
    if (this.url.endsWith('carrier-favorites')) {
      this.headervalue = 'Carrier Favorites Maintenance';
    }
    if (this.url.endsWith('carrier-favorites-admin')) {
      this.headervalue = 'Carrier Favorites Administration';
    }
    if (this.url.endsWith('client-maintenance')) {
      this.headervalue = 'Client Maintenance';
    }
    if (this.url.endsWith('doc-access')) {
      this.headervalue = 'Document Access';
    }
    if (this.url.endsWith('doc-folder')) {
      this.headervalue = 'Document Folder';
    }
    if (this.url.endsWith('reports')) {
      this.headervalue = 'Reports';
    }
    if (this.url.endsWith('superuseradmin')) {
      this.headervalue = 'Super User Admin';
    }
    if (this.url.endsWith('select-client')) {
      this.headervalue = 'Select Client';
    }
    if (this.url.search('carrier-detail') !== -1) {
      this.headervalue = 'Carrier Details';
    }
    if (this.url.endsWith('(carrierdetails:general)') || this.url.endsWith('(carrierdetails:summary)') || this.url.endsWith('(carrierdetails:financials)') || this.url.endsWith('(carrierdetails:documents)') || this.url.endsWith('(carrierdetails:licenses)')) {
      this.headervalue = 'Carrier Details';
    }
    if (this.url.endsWith('AuditTrail') || this.url.endsWith('ApprovedList') || 
      this.url.endsWith('CarrierApproval') || this.url.endsWith('OperatingStatus') ||
     this.url.endsWith('GroupReport')|| this.url.endsWith('RatingsUpdate')|| this.url.endsWith('MarketingReport')
     || this.url.endsWith('AdminCode')  || this.url.endsWith('MarketComparision')  || this.url.endsWith('RatingAgency') ){
      this.headervalue = 'Reports';
    }
    
  }

  dropdownstatus() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  activeComp(data) {
    if (data == 'Market Security Admin') {
      this.active = 'Market Security Admin';
      this.passive = 'Market Security';
      this.isAdminActive = true;
      this.isUserActive = false;
      this._router.navigate(['msHome']);
      this.headervalue = "Market Security Admin";
      window.location.reload();
    }
    else {
      this.passive = 'Market Security Admin';
      this.active = 'Market Security';
      this.isAdminActive = false;
      this.isUserActive = true;
      this._router.navigate(['home']);
      this.headervalue = "Welcome To Market Security";
      //window.location.reload();
    }
  }
  activeCompMob(data) {
    // console.log(data);
    if (data == 'Market Security Admin') {
      this.active = 'Market Security Admin';
      this.passive = 'Market Security';
      this.isAdminActive = true;
      this.isUserActive = false;
      this._router.navigate(['msHome']);
      this.headervalue = "Market Security Admin";
    }
    else {
      this.passive = 'Market Security Admin';
      this.active = 'Market Security';
      this.isAdminActive = false;
      this.isUserActive = true;
      this._router.navigate(['home']);
      this.headervalue = "Welcome To Market Security";
    }
  }

  logout() {
    this._http.get(this._settings.getApiUrl() + 'api/auth/logout')
      .subscribe((response) => {
        // TODO : redirect to oneplace
      });
  }
}
