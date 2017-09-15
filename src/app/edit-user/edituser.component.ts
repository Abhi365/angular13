import { Component, OnInit, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedInUser } from '../shared/loggedInUser/LoggedInUser';
import { EditUserService } from './edituser.service';
import { UserDetails, Role, Account, UserType, AccountActionIndicator, UserRole } from './edituser.model';
import * as _ from "lodash";

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css'],
  providers: [EditUserService]
})
export class EdituserComponent implements AfterContentInit {

  selectUserType: number;
  searchText: string;
  userSearchResult: Array<UserDetails>;
  selectedSearchIndex: number;
  selectedUser: UserDetails;
  accounts: Array<Account>;
  selectedUserAccountList: Array<Account>;
  removeSelectedAccounts: Array<string>;
  rolesList: Array<Role>;
  message: string;

  isSearchVisible: boolean;
  isUserDataLoaded: boolean;
  showRoles: boolean;
  showDetails: boolean;
  isroleopen: boolean;
  isdetailsopen: boolean;
  isSearchClicked: boolean;
  isSuccess: boolean;
  isError: boolean;
  noAccountToRemove: boolean;
  _this: any = this;

  constructor(private _router: Router, private _editUserService: EditUserService
    , private _loggedInUser: LoggedInUser) {
    this.cancel();
  }

  ngAfterContentInit(): void {
    this._editUserService.getRoles()
      .subscribe((result) => {
        this.rolesList = result;
      }, (error) => this.handleError(error));

    this._editUserService.getAccounts()
      .subscribe((result) => {
        this.accounts = result;
      }, (error) => this.handleError(error));
  }

  cancel() {
    this.isSearchVisible = false;
    this.isUserDataLoaded = false;
    this.showRoles = false;
    this.showDetails = false;
    this.isdetailsopen = true;
    this.selectedUser = null;
    this.selectedSearchIndex = null;
    this.userSearchResult = null;
    this.isSearchClicked = false;
    this.selectUserType = null;
    this.searchText = null;
    this.removeSelectedAccounts = null;
    this.isSuccess = false;
    this.noAccountToRemove = false;
    this.isError = false;
  }

  reset() {
    this.searchText = null;
    this.selectedSearchIndex = null;
  }

  contentload() {
    let userType = this.selectUserType;
    this.cancel();
    this.selectUserType = userType;
    this.isSearchVisible = true;
  }

  // search user and display pop up with result data
  searchload() {
    this._editUserService
      .getUserSearchResult(this.searchText, this.selectUserType)
      .subscribe((result) => {
        this.userSearchResult = result;
        this.isUserDataLoaded = true;
      }, (error) => this.handleError(error));
  }

  selectload() {
    // get selected user
    this.selectedUser = this.userSearchResult[this.selectedSearchIndex];
    this.searchText = this.selectedUser.DisplayName;
    this._editUserService.getUser(this.selectedUser).
      subscribe((result) => {
        this.selectedUser = result;
        this.showDetails = true;
        this.isdetailsopen = false;
        // check if User Already Exist
        if (this.selectedUser.UserId) {
          // check if logged in user has higher role compared to selected user
          if (this.checkIfLoggedInUserRoleisHigher())
            this.getUserAccounts();
          //throw error if not
          else
            this.showError('User is not authorized to edit selected User');
        } else {
          this.selectedUser.AccountList = [];
          this.selectedUserAccountList = [];
          this.isAccountToRemove();
        }
      }, (error) => this.handleError(error));
  }

  checkIfLoggedInUserRoleisHigher() {
    return this._loggedInUser.getRole().getRank() <= this.selectedUser.UserRole.getRank();
  }


  getUserAccounts() {
    this._editUserService.getAccountsForUser(this.selectedUser)
      .subscribe((result) => {
        this.selectedUser = result;
        this.selectedUserAccountList = _.cloneDeep(this.selectedUser.AccountList);
        this.isAccountToRemove();
        this.setShowRoles(this.selectedUser.UserRole.getRank());
      }, (error) => this.handleError(error));
  }

  onSelectedUserRoleChange($event) {
    if (parseInt($event) != 0) {
      this.selectedUser.setUserRole(this.rolesList[parseInt($event) - 1]);
    }
    this.setShowRoles(parseInt($event));
  }

  // show/hide user roles based on role type
  setShowRoles(userRole: UserRole) {
    switch (userRole) {
      case UserRole.WillisReader:
      case UserRole.ClientReader:
        this.showRoles = true;
        break;
      case UserRole.SuperAdministrator:
      case UserRole.MsdAdministrator:
      case UserRole.MsdBuAdministrator:
      default:
        this.showRoles = false;
        break;

    }
  }

  // Save Record using http request
  saverecord() {
    this.selectedUser.AccountList = this.selectedUserAccountList;
    if (this.selectedUser.UserId) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }


  updateUser() {
    this._editUserService.updateUser(this.selectedUser)
      .subscribe((result) => {
        if (result) {
          this.showSuccess('Update user Completed');
          this.resetAccountList();
        }
        else
          this.showError('Update User failed');
      }, (error) => this.handleError(error));
  }

  createUser() {
    this._editUserService.createUser(this.selectedUser)
      .subscribe((result) => {
        // if (result) {
        this.selectedUser.UserId = result;
        this.showSuccess('Create user Completed');
        this.resetAccountList();
        // //}
        // else
        //   this.showError('Create User failed');

      }, (error) => this.handleError(error));
  }

  resetAccountList() {
    this.selectedUser.AccountList = this.selectedUser.AccountList
      .filter((account) => account.ActionIndicator !== AccountActionIndicator.Remove);
    this.selectedUser.AccountList
      .forEach((account) => {
        account.ActionIndicator = AccountActionIndicator.None;
      });
    this.selectedUserAccountList = this.selectedUser.AccountList;
  }


  // remove selected Client from User Client List
  selectremove() {
    this.removeSelectedAccounts.forEach((clientId) => {
      let index = this.getClientindexSelectedUserAccountList(clientId);
      if (index !== -1) {
        if (this.getClientindexSelectedUser(clientId) === -1) {
          this.selectedUserAccountList.splice(index, 1);
        } else if (this.selectedUser.AccountList.length > 0) {
          this.selectedUserAccountList[index].ActionIndicator = AccountActionIndicator.Remove
        } else {
          this.selectedUserAccountList.splice(index, 1);
        }
      }
    });
    this.isAccountToRemove();
  }

  // function to check, if there is any account to be removed from user 
  isAccountToRemove() {
    let length = this.selectedUserAccountList
      .filter((account) => account.ActionIndicator == AccountActionIndicator.Add
        || account.ActionIndicator == AccountActionIndicator.None).length;
    if (length == 0)
      this.noAccountToRemove = true;
    else
      this.noAccountToRemove = false;

  }

  // Get Client Index based on Index Selected User AccountList
  getClientindexSelectedUserAccountList(accountId: string): number {
    return this.selectedUserAccountList.findIndex((account) => account.Id == accountId);
  }

  // Get Client Index from Selected User
  getClientindexSelectedUser(accountId: string): number {
    return this.selectedUser.AccountList.findIndex((account) => account.Id == accountId);
  }


  // add selectd client in user client list
  selectadd(accountId: string) {
    let existingIndex = this.getClientindexSelectedUserAccountList(accountId);
    if (existingIndex == -1) {
      let index = this.accounts.findIndex((account) => account.Id == accountId);
      if (index !== -1) {
        let account: Account = this.accounts[index];
        account.ActionIndicator = AccountActionIndicator.Add;
        this.selectedUserAccountList.push(account);
      }
    } else if (existingIndex >= 0) {
      this.selectedUserAccountList[existingIndex].ActionIndicator = AccountActionIndicator.None;
      this.showError('Already Exists!')
    }
    this.isAccountToRemove();
  }

  handleError(error) {
    this.showError('Some Error Occured, please report to support team along with steps to reproduce');
  }

  showSuccess(message: string) {
    this.message = message;
    this.isSuccess = true;
  }

  showError(message: string) {
    this.isError = true;
    this.message = message;
  }
}
