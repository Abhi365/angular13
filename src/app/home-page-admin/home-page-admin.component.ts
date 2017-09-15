import { Component, OnInit, AfterContentInit } from '@angular/core';
import { HomePageAdminService } from './home-page-admin.service';
import { Entities, EntityAttributes, EntityAttributeValues } from './home-page-admin.model';
// import { TermsOfUseResult } from './terms-of-use.mock.data';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription'
import * as _ from 'lodash';
declare var $: any;

@Component({
  selector: 'app-home-page-admin',
  templateUrl: './home-page-admin.component.html',
  styleUrls: ['./home-page-admin.component.css'],
  providers: [HomePageAdminService]

})
export class HomePageAdminComponent implements OnInit, AfterContentInit {
  isError: boolean;
  isSuccess: boolean;
  message: string;
  saveSuccess: false;
  homepageadminText: string;
  subscription: Subscription;
  isAlert:boolean;


  issave: boolean;
  constructor(private _homePageAdminService: HomePageAdminService) {
  }


  ngOnInit() {
    $.getScript('./assets/scripts/richTextEditor.js');
    this.subscription = Observable.fromEvent(document, 'keydown').subscribe(e => {
      if ($('#editor').html().trim() !== '' )
      { this.issave = false; }
      else { this.issave = true; }

    })

    

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



  ngAfterContentInit() {
    this.functionToDisplayHomepageadminText();
    this.issave = false;


  }



  functionToDisplayHomepageadminText() {
    
    this._homePageAdminService
      .gethomepageadminText().
      subscribe((result) => {
        $('#editor').html(result.Value["_body"]);
        this.homepageadminText = result.Value["_body"];
      }, (error) => this.handleError(error));
  }



  saverecord() {
    this.homepageadminText = ($('#editor').html());
    if (this.homepageadminText !== '')
      {
    this._homePageAdminService.UpdateHomepageadminText(this.homepageadminText)
    .subscribe((result) => {
      this.showSuccess('Home page admin mesaage update successfully');
      this.functionToDisplayHomepageadminText();
      //this.issave = true;

    }, (error) => this.handleError(error));
  }
  else{
    this.issave = true;
  }
  }



  getHomepage() {
    $('#editor').html('');
    this.functionToDisplayHomepageadminText();
     this.issave = false;
    this.isSuccess = false;
    this.isError = false;
  }


  showSuccess(message: string) {
    this.message = message;
    this.isSuccess = true;
    this.isError = false;
  }

  showError(message: string) {
    this.isSuccess = false;
    this.isError = true;
    this.message = message;

  }
  handleError(error) {
    this.isSuccess = false;
    this.isError = true;
    console.log('Error Occured');
    console.log(error);
    this.showError('Some Error Occured, please report to support team along with steps to reproduce');
  }




}



