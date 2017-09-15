import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from "lodash";

import { ClientmaintenanceService } from './clientmaintenance.service';
import { ClientMaintenaceState } from './clientmaintenance.state.service';
import { CreateClientHelper } from './clientmaintenance.helper';
import { LoggedInUser } from '../shared/loggedInUser/LoggedInUser';
import { ClientService } from '../select-client/client.service';
import { LoaderService } from '../shared/loaderComponent/Loader.service';
import { SelectClientHelper } from '../select-client/select-client.helper';
import {
  PartyInfo, PartyDetails, AssociatedCarrier, Account, ConsultancyStatus, AccountAccess,
  AssociationStatus
} from './clientmaintenance.model';


@Component({
  selector: 'app-clientmaintenance',
  templateUrl: './clientmaintenance.component.html',
  styleUrls: ['./clientmaintenance.component.css'],
  providers: [ClientmaintenanceService, LoggedInUser]
})


export class ClientMaintenanceComponent implements OnInit {

  value: string;
  searchText: string;
  searchCriteria: string;
  entityStatus: string;
  partyId: number;
  AccountId: number;
  message: string;
  selectedPartyIndex: number;
  importClientId: string;
  createButtonLoad = true;
  isModalHidden = false;
  isviewTable = false;
  loadData = false;
  editClient: boolean;
  saveSuccess = false;
  loadAdditonalData = false;
  isError: boolean;
  isSuccess: boolean;
  isSearchingClient: boolean;
  loggedInuserRank: number;
  clientSearchResult: Array<PartyInfo>;
  clientDropdown: Array<Account>;
  associatedCarriersList: Array<AssociatedCarrier>;
  account: Account;
  pageResults: Array<PartyInfo>;


  constructor(private _router: Router, private _clientmaintenanceService: ClientmaintenanceService, private _loggedInUser: LoggedInUser,
    private _clientMaintenaceState: ClientMaintenaceState, private _clientService: ClientService,
    private _loaderService: LoaderService) {
    this.pageResults = new Array<PartyInfo>();
    this.associatedCarriersList = new Array<AssociatedCarrier>();
    this.getPartyDropdown();
  }

  ngOnInit(): void {
    this.isError = false;
    this.isSuccess = false;

  }

  getSavedStatus() {
    this.isError = false;
    this.isSuccess = false;
    if (this._clientMaintenaceState.getAccount() !== undefined) {
      this.associatedCarriersList = this._clientMaintenaceState.getAssociatedCarriers();
      this.editClient = this._clientMaintenaceState.getEditClient();
      this.loadData = this.loadAdditonalData = true;
      this._clientService.getCarriers().forEach((carrier) => {
        this.associatedCarriersList
          .push(new AssociatedCarrier(carrier.CarrierId, carrier.LegalName, carrier.WillisCode,
            '', false, AssociationStatus.Added));
      });
      if (this.editClient)
        this.selectedPartyIndex = this.clientDropdown
          .findIndex((client) => client.Id === this._clientMaintenaceState.getAccount().Id)
      this.account = this._clientMaintenaceState.getAccount();
      // remove status from memory
      this._clientMaintenaceState.setAccount(undefined);
      this._clientMaintenaceState.setAssociatedCarriers(undefined);
    }
  }

  setSavedStatus() {
    this.isError = false;
    this.isSuccess = false;
    this._clientMaintenaceState.setAccount(this.account);
    this._clientMaintenaceState.setAssociatedCarriers(this.associatedCarriersList);
    this._clientMaintenaceState.setEditClient(this.editClient);
  }

  cancel() {
    this.isSearchingClient = false;
    this.loadData = false;
    this.searchCriteria = "1";
    this.entityStatus = "1";
    this.searchText = null;
    this.editClient = false;
    this.saveSuccess = false;
    this.loadAdditonalData = false;
    this.isError = false;
    this.isSuccess = false;
    this.isModalHidden = false;
    this.isviewTable = false;
    this.loadAdditonalData = false;
    this.pageResults = new Array<PartyInfo>();
    this.associatedCarriersList = new Array<AssociatedCarrier>();
    this.importClientId = null;
    this.selectedPartyIndex = null;
    //this.account = new Account('', '', 0, '', ConsultancyStatus.NonConsultancy, true, AccountAccess.SuperUsersOnly, []);

    this.account = (this._loggedInUser.UserRole !== undefined && this._loggedInUser.UserRole.Rank === 1) ? new Account('', '', 0, '', ConsultancyStatus.NonConsultancy, false, AccountAccess.SuperUsersOnly, [])
      :
      new Account('', '', 0, '', ConsultancyStatus.NonConsultancy, false, AccountAccess.AllAdmins, []);
  }

  resetSearchModal() {
    this.searchCriteria = "1";
    this.entityStatus = "1";
    this.searchText = null;
    this.saveSuccess = false;
  }

  getPageResult(event: any) {
    setTimeout(() => this.pageResults = event, 0);
  }

  loadModal() {
    this.cancel();
    this.isModalHidden = true;
    this.loadData = false;
    this.saveSuccess = false;
    this.loadAdditonalData = false;
  }

  loadEdit() {
    this.createButtonLoad = false;
    this.saveSuccess = false;
  }

  loadCreate() {
    this.createButtonLoad = true;
    this.loadData = false;
    this.saveSuccess = false;
  }

  redirectToCarrierSearch() {
    this.setSavedStatus();
    this._clientService.setSelectedAccount(SelectClientHelper.mapToAccount(this.account));
    // flag will help to show redirect button on carrier search page for client mainetnance
    this._clientService.setRedirectToClientMaintenance(true);
    this._router.navigate(['./carrier-search']);
  }

  showTable() {
    this.isviewTable = false;
    this.isSearchingClient = true;
    this._clientmaintenanceService.GetListofSubscription(this.searchCriteria, this.searchText).subscribe((result) => {
      this.clientSearchResult = result;
      this.isSearchingClient = false;
      this.isviewTable = true;
      this.saveSuccess = false;
      this.isError = false;
    this.isSuccess = false;
    }, (error) => {
      this.isSearchingClient = false;
      this.showError('Not able to fetch client list');
    });
  }

  getSelectedClientAssociatedCarriers() {
    if (this.importClientId !== undefined && this.importClientId !== null) {
      this._clientmaintenanceService.GetAssociatedCarriers(this.importClientId, AssociationStatus.Added).subscribe((result) => {
        this.associatedCarriersList = result;
        // set status as removed for old list
        this.account.AssociatedCarriers
          .forEach((associatedCarrier) => associatedCarrier.State = AssociationStatus.Removed);

        // set status as added for new list
        this.associatedCarriersList.forEach((carrier) => {
          let oldIndex = this.findAccountAssociatedCarriersIndex(carrier.CarrierId);
          if (oldIndex === -1)
            carrier.State = AssociationStatus.Added;
          else {
            let oldCarrier: AssociatedCarrier = this.account.AssociatedCarriers[oldIndex];
            carrier.State
              = (carrier.IsDefault === oldCarrier.IsDefault ? AssociationStatus.None : AssociationStatus.Modified);
          }
        });
        this.saveSuccess = false;
      });
    }
  }

  loadClientData() {
    if (this.selectedPartyIndex !== undefined && this.selectedPartyIndex !== null) {
      this._loaderService.show();
      this.loadAdditonalData = true;
      this.account = this.clientDropdown[this.selectedPartyIndex];
      this._clientmaintenanceService.GetAssociatedCarriers(this.account.Id, AssociationStatus.None)
        .subscribe((result) => {
          this.account.AssociatedCarriers = result;
          this.associatedCarriersList = _.cloneDeep(result);
          this._loaderService.hide();
        });
    } else {
      this.showError('Select Client')
    }

  }

  loadFields(client: PartyInfo) {
    this.isError = false;
    this.isSuccess = false;
    this._clientmaintenanceService.checkPartyAvailability(client.PartyId)
      .subscribe((result) => {
        if (!result) {
          this.account.setPartyId(client.PartyId);
          this.account.setPartyName(client.Name);
          this.account.setConsultancyStatus(ConsultancyStatus.NonConsultancy);
          this.editClient = false;
          this.loadData = true;
          this.loadAdditonalData = true;
        } else {
          this.showError('Client already added')
        }
      })
  }

  editFields() {
    this.isError = false;
    this.isSuccess = false;
    this.getPartyDropdown();
    this.cancel();
    this.editClient = true;
    this.loadData = true;
  }

  getPartyDropdown() {
    this.isError = false;
    this.isSuccess = false;
    this._loaderService.show();
    this._clientmaintenanceService.getPartyDropdown()
      .subscribe((result) => {
        this.clientDropdown = result;
        this.getSavedStatus();
        this._loaderService.hide();
      });
  }

  handleError(error) {
    this.showError('Some Error Occured, please report to support team along with steps to reproduce');
  }

  showSuccess(message: string) {
    this.message = 'Client Details saved successfully';
    this.saveSuccess = true;
    this.isSuccess = true;
    this.isError = false;
  }

  showError(message: string) {
    //this.cancel();
    this.isSuccess = false;
    this.isError = true;
    this.message = message;
    this._loaderService.hide();
  }

  // Save Record using http request
  saverecord() {
    this.isError = false;
    this.isSuccess = false;
    this.processAssociatedCarriers();
    // this._loaderService.show();
    if (this.account.Id) {
      this.updateAccount();
    } else {
      this.createAccount();
    }
    //document.body.scrollTop = 0;
    //document.documentElement.scrollTop = 0;
   

  }

  updateAccount() {
    this._clientmaintenanceService.updateAccount(this.account)
      .subscribe(() => {
        this.resetAccountAssocaitedCarrierList();
        this.showSuccess('Update user Completed');
        this._loaderService.hide();
      }, (error) => this.handleError(error));
  }

  createAccount() {
    this._clientmaintenanceService.createAccount(this.account)
      .subscribe((result) => {
        this.account.Id = result;
        this.resetAccountAssocaitedCarrierList();
        this.showSuccess('Create user Completed');
        this._loaderService.hide();
      }, (error) => this.handleError(error));
  }

  findAccountAssociatedCarriersIndex(carrierId: number) {
    return this.account.AssociatedCarriers.findIndex((carrier) => carrier.CarrierId === carrierId);
  }

  findAssociatedCarriersListIndex(carrierId: number) {
    return this.associatedCarriersList.findIndex((carrier) => carrier.CarrierId === carrierId);
  }

  /*
  * Process Associated Carriers List
  */
  processAssociatedCarriers() {
    this.isError = false;
    this.isSuccess = false;
    this.associatedCarriersList.forEach((carrier) => {
      let oldIndex = this.findAccountAssociatedCarriersIndex(carrier.CarrierId);
      if (oldIndex !== -1) {
        let oldCarrier = this.account.AssociatedCarriers[oldIndex];
        if (carrier.IsDelete)
          carrier.State = AssociationStatus.Removed
        else if (oldCarrier.Comments !== carrier.Comments || oldCarrier.IsDefault !== carrier.IsDefault)
          carrier.State = AssociationStatus.Modified;

        //else part for None
        this.account.AssociatedCarriers[oldIndex] = carrier;
      } else if (oldIndex === -1 && !carrier.IsDelete) {
        carrier.State = AssociationStatus.Added;
        this.account.AssociatedCarriers.push(carrier);
      }
    });
  }


  /*
  *  Reset Associated Carrier List after save and update
  */
  resetAccountAssocaitedCarrierList() {
    this.isError = false;
    this.isSuccess = false;
    this.account.AssociatedCarriers = this.account.AssociatedCarriers
      .filter((carrier) => carrier.State !== AssociationStatus.Removed);

    this.account.AssociatedCarriers
      .forEach((carrier) => carrier.State = AssociationStatus.None);
    this.associatedCarriersList = _.cloneDeep(this.account.AssociatedCarriers);
  }
}
