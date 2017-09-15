import { Component, OnInit, AfterContentInit } from '@angular/core';
import { AnnouncementsService } from './announcements.service';
import { Announcement, Account, AnnouncementDocumentLink, AnnouncementClient } from './announcements.model';
import { DatepickerComponent } from '../shared/datepicker/datepicker.component';


import * as _ from 'lodash';
declare var $: any;
@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css'],
  providers: [AnnouncementsService]
})
export class AnnouncementsComponent implements OnInit, AfterContentInit {

  isTableVisible = true;
  isCreateAnnouncementVisible = false;
  iseditTable = false;
  isEditingAnnouncement: boolean;
  isDisabled = true;
  assigned = [];
  announcementResult = [];
  specificAnnoucementsData: any;
  title: string;
  description: string;
  docLink: string;
  extLink: string;
  expiryDate: string;
  isError: boolean;
  isSuccess: boolean;
  message: string;
  saveSuccess: false;
  clients: any;
  id: string;
  private selectedLink: string = "No";
  selectedClients: Array<string>;
  availableclientList: Array<Account>;
  availableclient: Array<Account>;
  selectedUserAccountList: Array<Account>;
  removeSelectedAccounts: Array<string>;
  announcementId: string;
  saveorupdateflag: string;
  isAllClients: boolean;
  allClientsFlag: boolean;
  documentLink: Array<AnnouncementDocumentLink>;
  AnnouncementClient: Array<AnnouncementClient>;

  constructor(private _announcementsService: AnnouncementsService) {
    this.availableclientList = new Array<Account>();
    this.selectedUserAccountList = new Array<Account>();
    this.availableclient = new Array<Account>();
    this.AnnouncementClient = new Array<AnnouncementClient>();

  }

  dateChange(expiryDate:string):void {
    this.expiryDate=expiryDate;
  }

  ngOnInit() {
    $.getScript('./assets/scripts/richTextEditor.js');
    //this.functionToFetchData();
    this.functionToFetchAccountsData();
    // this.showSuccess('');
  }
  ngAfterContentInit() {
    this.functionToFetchData();
    this.isSelected('No');
    this.functionToFetchAccountsData();
    this.isAllClients = false;
    this.allClientsFlag = false;
    //this.showSuccess('');

  }

 functionToFetchData() {
    this._announcementsService
      .getAnnouncements().
      subscribe((result) => {
        this.announcementResult = result;
      }, (error) => this.handleError(error));
  }



  /*functionToFetchAccountsData() {
    this.availableclientList = accounts;
    this.availableclient = _.cloneDeep(accounts);

  }*/


  functionToFetchAccountsData() {
    this._announcementsService.getAccounts()
      .subscribe((result) => {
        //  this.availableclient = result;
        this.availableclientList = result;
        this.availableclient = _.cloneDeep(result);
      }, (error) => this.handleError(error));
  }

  DeleteAnnouncement(AnnouncementId: string) {
    this._announcementsService
      .DeleteAnnouncement(AnnouncementId)
      .subscribe(() => {
        this.functionToFetchData();
        this.showSuccess('Announcement Deleted!')
      }, (error) => this.handleError(error));


  }

  saverecord() {
    if (this.announcementId !== undefined && this.announcementId !== null) { /* Here If to have the Condition */
      this.updateAnnouncement();
    } else {
      this.createAnnouncement();
    }

  }

  displayinputDetails() {
    this.isTableVisible = false;
    this.isCreateAnnouncementVisible = true;
    this.iseditTable = true;
    this.isDisabled = true;
    $.getScript('./assets/scripts/richTextEditor.js');
    setTimeout(function () {
      $('#editor').html(this.description);
    }, 0);
  }


  createAnnouncement() {

    this.description = ($('#editor').html());

    if (this.selectedUserAccountList.length > 0) {
      this.selectedUserAccountList.forEach((account) => {
        this.AnnouncementClient.push({ MosaicClientId: account.Id });
        // this.AnnouncementClient.push(ann)
      });
    }


    this._announcementsService.CreateAnnouncement(this.title, this.description, this.expiryDate,
      this.extLink, this.allClientsFlag, this.documentLink, this.AnnouncementClient)
      .subscribe((result) => {
        //if (result) {

        this.showSuccess('Announcement saved successfully');
        this.isDisabled = false;
        this.announcementId = result;
        // }
        // else {
        //   this.isDisabled = true;
        //   this.showError('Announcement Creation failed');
        //   this.announcementId = "";
        // }

      }, (error) => this.handleError(error));
  }

  updateAnnouncement() {
    this.description = ($('#editor').html());
    this._announcementsService.UpdateAnnouncement(this.title, this.description, this.expiryDate, this.announcementId)
      .subscribe(() => {
        this.showSuccess('Announcement update successfully');
      }, (error) => this.handleError(error));

  }


  EditAnnouncement(AnnouncementId: string) {
    this.isTableVisible = false;
    this.isCreateAnnouncementVisible = true;
    this.iseditTable = false;
    this.isDisabled = true;
    this.isEditingAnnouncement = true;
    this.getAnnouncementsById(AnnouncementId);
    this.announcementId = AnnouncementId;
  }

  

  getAnnouncementsById(AnnouncementId: string) {
    this._announcementsService
      .getAnnouncementsById(AnnouncementId)
      .subscribe((result) => {
        setTimeout(function () {
          $('#editor').html(result.Body);
        }, 0);
        this.description = result.Body;
        this.title = result.Title;
        this.expiryDate = result.ExpiryDate;
        this.extLink = result.WebLinkURL;
        this.allClientsFlag = result.AllClients;
        this.documentLink = result.DocumentLink;
        this.AnnouncementClient = result.AnnouncementClient;
        this.announcementId = AnnouncementId;
        if (result.AnnouncementClient.length) {
          result.AnnouncementClient.forEach((announcementClientId) => {
            let index = this.availableclientList.findIndex((account) => account.Id == announcementClientId.MosaicClientId);
            this.selectedUserAccountList
              .push(this.availableclientList[index]);
            this.availableclientList.splice(index, 1);
          });
        }
      }, (error) => this.handleError(error));
  }

  getHomepage() {
    this.cleardetails();
    this.isTableVisible = true;
    this.isCreateAnnouncementVisible = false;
    this.iseditTable = false;
    this.isSuccess = false;
    this.isError = false;
    this.isEditingAnnouncement = false;
    this.functionToFetchData();
  }

  cleardetails() {
    this.title = "";
    this.description = "";
    ($('#editor').html(this.description));
    this.docLink = "";
    this.extLink = "";
    this.expiryDate = "";
    this.clients = "";
    this.announcementId = null;
    this.selectedClients = new Array<string>();
    this.removeSelectedAccounts = new Array<string>();
    this.selectedUserAccountList = new Array<Account>();;
    this.availableclientList = _.cloneDeep(this.availableclient);
  }


  showSuccess(message: string) {

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
    this.showError('Some Error Occured, please report to support team along with steps to reproduce');
  }


  getClientindexSelectedUserAccountList(accountId: string): number {
    return this.availableclientList.findIndex((account) => account.Id == accountId);
  }

  getClientindexRemovedUserAccountList(accountId: string): number {
    return this.selectedUserAccountList.findIndex((account) => account.Id == accountId);
  }

  addClientName() {
    this.selectedClients.forEach((clientId) => {
      let index = this.getClientindexSelectedUserAccountList(clientId);
      if (index !== -1) {
        let account: Account = this.availableclientList[index];
        this.selectedUserAccountList.push(account);
        this.availableclientList.splice(index, 1);
      }
    });
  }

  removeClientName() {
    this.removeSelectedAccounts.forEach((clientId) => {
      let index = this.getClientindexRemovedUserAccountList(clientId);
      if (index !== -1) {
        let account: Account = this.selectedUserAccountList[index];
        this.availableclientList.push(account);
        this.selectedUserAccountList.splice(index, 1);
      }

    });

  }



  setAssignUser(e: string): void {

    this.selectedLink = e;
    if (e == "Yes") {
      //this.isAllClients = true;
      this.allClientsFlag = true;
      this.availableclientList = _.cloneDeep(this.availableclient);

    }
    else {
      //this.isAllClients = false;
      this.allClientsFlag = false;
      this.availableclientList = _.cloneDeep(this.availableclient);
      this.selectedUserAccountList.splice(0, this.selectedUserAccountList.length);


    }
  }

  isSelected(name: string): boolean {

    if (!this.selectedLink) {
      // if no radio button is selected, always return false so every nothing is shown
      return false;
    }

    return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
  }



}

