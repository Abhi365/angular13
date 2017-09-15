import { Component, OnInit, AfterContentInit } from '@angular/core';
import { TermsOfUseService } from './terms-of-use.service';
import { TermsOfUse } from './terms-of-use.model';
import { TermsOfUseResult } from './terms-of-use.mock.data';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription'
import * as _ from 'lodash';
declare var $: any;
@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.css'],
  providers: [TermsOfUseService]
})
export class TermsOfUseComponent implements OnInit, AfterContentInit {

  termsOfUseResult: Array<TermsOfUse>;
  isError: boolean;
  isSuccess: boolean;
  isAlert:boolean;
  message: string;
  saveSuccess: false;
  currentVersionId: number;
  termsOfUseText: string;
  disableDIV: boolean;
  subscription: Subscription;
  iseditable: boolean;
  iseditclick: boolean;
  previoestermsOfUseText: string;
  issave: boolean;
  constructor(private _termsOfUseService: TermsOfUseService) {
    // this.termsOfUseResult = new Array<TermsOfUse>();
    this.termsOfUseText = '';


  }


  ngOnInit() {
    $.getScript('./assets/scripts/richTextEditor.js');
    //this.functionToFetchtermsOfUseData();
    
    this.subscription = Observable.fromEvent(document, 'keydown').subscribe(e => {
      if(this.previoestermsOfUseText.trim() === $('#editor').html().trim())
        {this.issave = true;}
      else{this.issave = false;}
      
    })
    this.iseditable = false;
  }



  ngAfterContentInit() {
    this.functionToFetchtermsOfUseData();
    this.functionToDisplayLatesttermsOfUseData();
    this.issave = true;
    this.iseditable = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  functionToFetchtermsOfUseData() {
    this._termsOfUseService
      .getalltermsofuse().
      subscribe((result) => {
        this.termsOfUseResult = result;

      }, (error) => this.handleError(error));
  }


  functionToDisplayLatesttermsOfUseData() {
    this._termsOfUseService
      .gettermsofuseByCurrentVersion().
      subscribe((result) => {
        $("#editor").eq(0).attr("contenteditable", false);
        $('#editor').html(result.TermsOfUseText);
        this.termsOfUseText = result.TermsOfUseText;
        this.previoestermsOfUseText = result.TermsOfUseText;
        this.currentVersionId = result.Version;
      }, (error) => this.handleError(error));
  }

  Edittermsofuse(edditVersionId: number) {
    this.gettermsofuseByVersionId(edditVersionId);
    this.iseditable = true;
    this.issave = true;
    if (this.currentVersionId === edditVersionId) {
      this.iseditclick = true;
      $("#editor").eq(0).attr("contenteditable", true);

    }
    else {
      $("#editor").eq(0).attr("contenteditable", false);

    }

  }

  gettermsofuseByVersionId(edditVersionId: number) {
    this._termsOfUseService
      .gettermsofuseByVersion(edditVersionId)
      .subscribe((result) => {
        $('#editor').html(result.TermsOfUseText);
        this.termsOfUseText = result.TermsOfUseText;
        this.previoestermsOfUseText=result.TermsOfUseText;
      }, (error) => this.handleError(error));

  }

  gettexteditorEditableforedit() {
    $("#editor").eq(0).attr("contenteditable", true);
    this.issave = true;
    this.iseditclick = true;
    this.isSuccess = false;
    this.isError = false;
    this.iseditable = true;
  }

  gettexteditorEditableforsave() {

    $("#editor").eq(0).attr("contenteditable", true);
    $('#editor').html('');
    this.previoestermsOfUseText = "";
    this.issave = true;
    this.iseditclick = false;
    this.isSuccess = false;
    this.isError = false;
    this.iseditable = true;
  }

  saverecord() {

    if (this.iseditclick === true) { /* Here If to have the Condition */
      this.UpdateTermsOfUseText();
    } else {
      this.createTermsOfUseText();
    }

  }
  createTermsOfUseText() {
    this.termsOfUseText = ($('#editor').html());

    this._termsOfUseService.CreateTermsOfUseText(this.termsOfUseText, this.currentVersionId).subscribe((result) => {
      this.showSuccess('Terms Of Use Text saved successfully');
      this.functionToFetchtermsOfUseData();
      this.functionToDisplayLatesttermsOfUseData();
      this.issave = true;
      this.currentVersionId = result;
      this.iseditable = false;
    }, (error) => this.handleError(error));
  }


  UpdateTermsOfUseText() {
    this.termsOfUseText = ($('#editor').html());
    
    this._termsOfUseService.UpdateTermsOfUseText(this.termsOfUseText, this.currentVersionId).subscribe((result) => {
      this.showSuccess('Terms Of Use Text Update successfully');
      this.functionToFetchtermsOfUseData();
      this.functionToDisplayLatesttermsOfUseData();
      this.issave = true;
      this.iseditable = false;

    }, (error) => this.handleError(error));
  }



  getHomepage() {
    this.functionToFetchtermsOfUseData();
    this.functionToDisplayLatesttermsOfUseData();
    this.issave = true;
    this.iseditable = false;
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

