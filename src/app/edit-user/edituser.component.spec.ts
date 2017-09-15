import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect, tick, fakeAsync, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing'
import { By } from '@angular/platform-browser';
import { DebugElement, Injector } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpModule, Http, XHRBackend, RequestOptions, ResponseOptions } from '@angular/http';
import { Jquery } from 'jquery';
import { Observable } from 'rxjs/Rx';

import { Settings } from '../shared/settings/settings.service';
import { LoggedInUser } from '../shared/loggedInUser/LoggedInUser';
import { EdituserComponent } from './edituser.component';
import { UserDetails, Account, Role, AccountActionIndicator, UserRole } from './edituser.model';
import { EditUserHelper } from './edituser.helper';
import { EditUserService } from './edituser.service';

import { roles, accounts, userSearchResult } from './edituser.mock.data';

describe('EdituserComponent', () => {
  let component: EdituserComponent;
  let fixture: ComponentFixture<EdituserComponent>;
  let userType, userService, loggedInUserService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [EdituserComponent],
      imports: [
        FormsModule,
        HttpModule
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ComponentFixtureAutoDetect, useValue: true },
        {
          provide: Http,
          useFactory: httpFactory,
          deps: [XHRBackend, RequestOptions]
        },
        //Settings,
        { provide: LoggedInUser, useClass: LoggedInUserMock },
        { provide: XHRBackend, useClass: MockBackend },
        MockBackend
      ]
    }).overrideComponent(EdituserComponent, {
      set: {
        providers: [
          { provide: EditUserService, useClass: EditUserServiceMock }
        ]
      }
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdituserComponent);
    component = fixture.componentInstance;
    userService = fixture.debugElement.injector.get(EditUserService);
    fixture.detectChanges();
    userType = fixture.debugElement.query(By.css('input[name=userType]')).nativeElement;
  });

  it('User Type Selection should Call ContentLoad Function', fakeAsync(() => {
    spyOn(component, 'contentload');
    userType.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    tick();
    expect(component.contentload).toHaveBeenCalled();
  }));

  it('Search Field should not be defined without usertype change', fakeAsync(() => {
    expect(fixture.debugElement.query(By.css('input[name=searchText]'))).toBeNull();
  }));

  it('Search Field should be defined after calling content load function', fakeAsync(() => {
    component.contentload();
    fixture.detectChanges();
    tick();
    expect(fixture.debugElement.query(By.css('input[name=searchText]'))).toBeTruthy();
  }));

  describe('Search Functionality Test', () => {
    let searchButton;
    beforeEach(fakeAsync(() => {
      component.contentload();
      fixture.detectChanges();
      tick();
      searchButton = fixture.debugElement.query(By.css('button[name=searchButton]')).nativeElement;
    }));

    it('Search Button Should call Search Load Function', fakeAsync(() => {

      spyOn(component, 'searchload');
      searchButton.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();
      expect(component.searchload).toHaveBeenCalled();
    }))

    it('Reset Button should call reset function', fakeAsync(() => {
      spyOn(component, 'reset');
      const resetButton = fixture.debugElement.query(By.css('button[name=resetButton]')).nativeElement;
      resetButton.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();
      expect(component.reset).toHaveBeenCalled();
    }));

    it('Search Load function should call get User Search Result from service', fakeAsync(() => {
      spyOn(userService, 'getUserSearchResult').and.returnValue(
        Observable.of(userSearchResult)
      );
      expect(component.userSearchResult).toBeNull();
      component.searchload();
      fixture.detectChanges();
      expect(component.userSearchResult).not.toBeNull();
    }));

  });


  describe('User Details Test', () => {
    let testUser;
    beforeEach(fakeAsync(() => {
      testUser = {
        'PrincipalId': 102,
        'UserType': '2',
        'UserStatus': '2',
        'Surname': 'Pandey',
        'Forename': 'Nilesh',
        'Initials': 'py.nilesh',
        'EmailId': 'nilesh.pandey@wtw.com',
        'Country': 'India',
        'Location': 'Mumbai',
        'UserLogin': 'INT\\User2',
        'UserRole': {
          'RoleCode': 'ClientRead',
          'RoleDescription': 'Client Reader',
          'RoleId': 4,
          'Rank': 4
        },
        'AccountList': [
          {
            'Id': 1,
            'AccountName': 'ABB Hongkong Limited (212323)'
          },
          {
            'Id': 2,
            'AccountName': 'Swiss Life (Espana) (232342)'
          },
          {
            'Id': 3,
            'AccountName': 'Farmers Insurance (453412)'
          },
          {
            'Id': 4,
            'AccountName': 'Zenith Insurance (124512)'
          }
        ]
      };

      roles.forEach((role) => {
        component.rolesList.push(EditUserHelper.mapToRole(role));
      });
      //component.rolesList = ;
      fixture.detectChanges();
      tick();

      const user = EditUserHelper.mapToUserDetails(testUser);
      user.setUserRole(testUser.UserRole);

      const userAccountList: Array<Account> = new Array<Account>();
      testUser.AccountList.forEach((account) => {
        userAccountList.push(EditUserHelper.mapToAccount(account, AccountActionIndicator.Add));
      });
      user.setAccountList(userAccountList);

      component.selectedUser = user;
      component.selectedUserAccountList = component.selectedUser.AccountList;
      component.showDetails = true;
      fixture.detectChanges();
      tick();

    }));


    it('checkIfLoggedInUserRoleisHigher should return true', () => {
      component.selectedUser = EditUserHelper.mapToUserDetails(testUser);
      component.selectedUser
        .setUserRole(new Role(testUser.UserRole.RoleId, testUser.UserRole.RoleCode, testUser.UserRole.RoleDescription, testUser.UserRole.Rank));
      //console.log('User Role');
      //console.log(component.selectedUser.UserRole);
      let result = component.checkIfLoggedInUserRoleisHigher();
      expect(result).toEqual(true);
    });

    it('User Login detail Should be shown', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      const userLogin = fixture.debugElement.query(By.css('p')).nativeElement;
      expect(userLogin.innerText).toEqual('INT\\User2');
    }));

    it('User Role Should be Selected', fakeAsync(() => {
      const selectedUserRole = fixture.debugElement.query(By.css('select[name=selectedUserRole]')).nativeElement;
      expect(selectedUserRole.value).toEqual('4');
    }));

    it('if User Role is changed then onSelectedUserRoleChange should have been called', fakeAsync(() => {
      spyOn(component, 'onSelectedUserRoleChange');
      const selectedUserRole = fixture.debugElement.query(By.css('select[name=selectedUserRole]')).nativeElement;
      selectedUserRole.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      tick();
      expect(component.onSelectedUserRoleChange).toHaveBeenCalled();
    }));


    it('if User Role is WTW Reader/Client Reader then User Clients List should be shown', fakeAsync(() => {
      // WTW Reader
      component.onSelectedUserRoleChange('4');
      fixture.detectChanges();
      tick();
      const selectedUserRole = fixture.debugElement.query(By.css('select[name=selctedUserClients]'));
      expect(selectedUserRole).toBeTruthy();
    }));

    it('if User Role is not WTW Reader/Client Reader then User Clients List should not be shown', fakeAsync(() => {
      // Super admin
      component.onSelectedUserRoleChange('1');
      fixture.detectChanges();
      tick();
      const selectedUserRole = fixture.debugElement.query(By.css('select[name=selctedUserClients]'));
      expect(selectedUserRole).toBeNull();
    }));

  });


  describe('User Roles', () => {
    let testUser;
    beforeEach(fakeAsync(() => {
      testUser = {
        'PrincipalId': '102',
        'UserType': '1',
        'UserStatus': '1',
        'Surname': 'Pandey',
        'Forename': 'Nilesh',
        'Initials': 'py.nilesh',
        'EmailId': 'nilesh.pandey@wtw.com',
        'Country': 'India',
        'Location': 'Mumbai',
        'UserLogin': 'INT\\User2',
        'UserRole': {
          'RoleCode': 'ClientRead',
          'RoleDescription': 'Client Reader',
          'RoleId': 4,
          'Rank': 4
        },
        'AccountList': [
          {
            'Id': 1,
            'AccountName': 'ABB Hongkong Limited (212323)',
            'ActionIndicator': 1
          },
          {
            'Id': 2,
            'AccountName': 'Swiss Life (Espana) (232342)',
            'ActionIndicator': 0
          },
          {
            'Id': 3,
            'AccountName': 'Farmers Insurance (453412)',
            'ActionIndicator': 2
          },
          {
            'Id': 4,
            'AccountName': 'Zenith Insurance (124512)',
            'ActionIndicator': 1
          }
        ]
      };

      roles.forEach((role) => {
        component.rolesList.push(EditUserHelper.mapToRole(role));
      });
      fixture.detectChanges();
      tick();


      const user = EditUserHelper.mapToUserDetails(testUser);
      user.setUserRole(testUser.UserRole);

      const userAccountList: Array<Account> = new Array<Account>();
      testUser.AccountList.forEach((account) => {
        userAccountList.push(EditUserHelper.mapToAccount(account, AccountActionIndicator.Add));
      });
      user.setAccountList(userAccountList);

      component.selectedUser = user;

      component.selectedUserAccountList = component.selectedUser.AccountList;
      component.showDetails = true;
      fixture.detectChanges();
      tick();

    }));


    it('Add Button should call select add function', fakeAsync(() => {
      spyOn(component, 'selectadd');
      component.showRoles = true;
      fixture.detectChanges();
      tick();
      const addButton = fixture.debugElement.query(By.css('button[name=addButton')).nativeElement;
      addButton.dispatchEvent(new Event('click'));
      expect(component.selectadd).toBeTruthy();
    }));


    it('remove Button should call remove function', fakeAsync(() => {
      spyOn(component, 'selectremove');
      component.showRoles = true;
      fixture.detectChanges();
      tick();
      const removeButton = fixture.debugElement.query(By.css('button[name=removeButton')).nativeElement;
      removeButton.dispatchEvent(new Event('click'));
      expect(component.selectremove).toBeTruthy();
    }));

    it('Add Selcted Client to User Client List', () => {
      component.accounts = accounts;
      component.selectadd('6');
      expect(component.selectedUser.AccountList.findIndex((account) => account.Id === '6')).toBeGreaterThanOrEqual(0);
    });

    it('Remove Selected Client from User Client List', () => {
      component.accounts = accounts;
      component.removeSelectedAccounts = ['2'];
      component.selectremove();
      // expect(component.selectedUser.AccountList.findIndex((account) => account.Id == 2)).toEqual(-1);
      expect(component.selectedUser.AccountList
        .filter((account) => account.Id === '2' && account.ActionIndicator === AccountActionIndicator.Remove))
        .toBeTruthy();
    })

    it('Save User Record', fakeAsync(() => {
      spyOn(component, 'saverecord');
      component.showRoles = true;
      fixture.detectChanges();
      tick();
      const saveButton = fixture.debugElement.query(By.css('button[name=saveButton')).nativeElement;
      saveButton.dispatchEvent(new Event('click'));
      expect(component.saverecord).toHaveBeenCalled();
    }));

    it('Create new user for which there is no user id', fakeAsync(() => {
      spyOn(component, 'createUser');
      //spyOn(userService, 'createUser')
      component.selectedUser.setUserId(undefined);
      component.saverecord();
      expect(component.createUser).toHaveBeenCalled();
      // component.createUser();
      // expect(userService.createUser).toHaveBeenCalled();
    }));
    it('Update user for which there user id is available', fakeAsync(() => {
      spyOn(component, 'updateUser');
      //spyOn(userService, 'createUser')
      component.selectedUser.setUserId('XXXXX');
      component.saverecord();
      expect(component.updateUser).toHaveBeenCalled();
      // component.createUser();
      // expect(userService.createUser).toHaveBeenCalled();
    }));


    it('selectLoad Function should set showDetails and isDetailsOpen', fakeAsync(() => {
      component.userSearchResult = EditUserServiceMock.getUserDetails();
      component.selectedSearchIndex = 2;
      component.selectedUser = EditUserHelper.mapToUserDetails(testUser);
      component.selectedUser
        .setUserRole(new Role(testUser.UserRole.RoleId, testUser.UserRole.RoleCode, testUser.UserRole.RoleDescription, testUser.UserRole.Rank));
      component.selectload();
      expect(component.showDetails).toEqual(true);
      expect(component.isdetailsopen).toEqual(false);
    }));

    it('resetAccountList should reset all actionIndicator to None', () => {
      component.selectedUser = EditUserHelper.mapToUserDetails(testUser);
      component.selectedUser
        .setUserRole(new Role(testUser.UserRole.RoleId, testUser.UserRole.RoleCode, testUser.UserRole.RoleDescription, testUser.UserRole.Rank));
      component.selectedUser.AccountList = userService.getAccountsForUser();
      component.resetAccountList();
      let result = component.selectedUser.AccountList.filter((account) => account.ActionIndicator !== AccountActionIndicator.None);
      expect(result.length).toBeUndefined();
    });



    it('getUserAccounts Function should call chekIfLoggedInUserRoleisHigher', fakeAsync(() => {
      spyOn(component, 'isAccountToRemove');
      component.userSearchResult = EditUserServiceMock.getUserDetails();
      component.selectedSearchIndex = 2;
      component.selectedUser = EditUserHelper.mapToUserDetails(testUser);
      component.selectedUser
        .setUserRole(new Role(testUser.UserRole.RoleId, testUser.UserRole.RoleCode, testUser.UserRole.RoleDescription, testUser.UserRole.Rank));
      component.getUserAccounts();
      expect(component.isAccountToRemove).toHaveBeenCalled();
    }));

  });

  describe('Cancel activity during Edit User', () => {
    it('Cancel Function should be called on Click of Cancel Button', fakeAsync(() => {
      spyOn(component, 'cancel');
      const testUser = {
        'PrincipalId': 102,
        'UserType': '1',
        'UserStatus': '2',
        'Surname': 'Pandey',
        'Forename': 'Nilesh',
        'Initials': 'py.nilesh',
        'EmailId': 'nilesh.pandey@wtw.com',
        'Country': 'India',
        'Location': 'Mumbai',
        'UserLogin': 'INT\\User2',
        'UserRole': {
          'RoleCode': 'SuperAdmin',
          'RoleDescription': 'Super Admin',
          'RoleId': 1,
          'Rank': 1
        },
        'AccountList': [
          {
            'Id': 1,
            'AccountName': 'ABB Hongkong Limited (212323)'
          },
          {
            'Id': 2,
            'AccountName': 'Swiss Life (Espana) (232342)'
          },
          {
            'Id': 3,
            'AccountName': 'Farmers Insurance (453412)'
          },
          {
            'Id': 4,
            'AccountName': 'Zenith Insurance (124512)'
          }
        ]
      };

      const user = EditUserHelper.mapToUserDetails(testUser);
      user.setUserRole(EditUserHelper.mapToRole(testUser.UserRole));

      const userAccountList: Array<Account> = new Array<Account>();
      testUser.AccountList.forEach((account) => {
        userAccountList.push(EditUserHelper.mapToAccount(account, AccountActionIndicator.Add));
      });
      user.setAccountList(userAccountList);

      component.selectedUser = user;

      component.selectedUserAccountList = component.selectedUser.AccountList;
      const result: Array<Account> = new Array<Account>();
      accounts.forEach((account) => {
        result.push(EditUserHelper.mapToAccount(account, AccountActionIndicator.Remove));
      });
      component.accounts = result;
      component.showRoles = true;
      fixture.detectChanges();
      tick();
      const cancelButton = fixture.debugElement.query(By.css('button[name=cancelButton]')).nativeElement;
      cancelButton.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();
      expect(component.cancel).toHaveBeenCalled();
    }));

    it('Cancel Activity test', () => {
      component.cancel();
      expect(component.isSearchVisible).toEqual(false);
      expect(component.isUserDataLoaded).toEqual(false);
      expect(component.showRoles).toEqual(false);
      expect(component.showDetails).toEqual(false);
      expect(component.isdetailsopen).toEqual(true);
      expect(component.isSearchClicked).toEqual(false);

      expect(component.selectedUser).toEqual(null);
      expect(component.selectedSearchIndex).toEqual(null);
      expect(component.userSearchResult).toEqual(null);
      expect(component.selectUserType).toEqual(null);
      expect(component.searchText).toEqual(null);
      expect(component.removeSelectedAccounts).toEqual(null);
    });

    it('showError should set message as Error', () => {
      component.showError('Error');
      expect(component.message).toEqual('Error');
    });

    it('handleError should call showError', () => {
      spyOn(component, 'showError');
      component.handleError('Error');
      expect(component.showError).toHaveBeenCalled();
    });

    it('showSuccess should set message as Success', () => {
      component.showSuccess('Success');
      expect(component.message).toEqual('Success');
    });

    it('reset should set searchText as null', () => {
      component.reset();
      expect(component.searchText).toEqual(null);
    });
  });

});



describe('Edit User Service', () => {
  let component: EdituserComponent;
  let fixture: ComponentFixture<EdituserComponent>;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [EdituserComponent],
      imports: [
        FormsModule,
        HttpModule
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ComponentFixtureAutoDetect, useValue: true },
        {
          provide: Http,
          useFactory: httpFactory,
          deps: [XHRBackend, RequestOptions]
        },
        Settings,
        { provide: LoggedInUser, useClass: LoggedInUserMock },
        { provide: XHRBackend, useClass: MockBackend },
        MockBackend,
        EditUserService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdituserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  //let mockBackend: any;
  //let editService:any;
  const testUser = {
    'PrincipalId': 102,
    'UserType': '1',
    'UserStatus': '2',
    'Surname': 'Pandey',
    'Forename': 'Nilesh',
    'Initials': 'py.nilesh',
    'EmailId': 'nilesh.pandey@wtw.com',
    'Country': 'India',
    'Location': 'Mumbai',
    'UserLogin': 'INT\\User2',
    'UserRole': {
      'RoleCode': 'ClientRead',
      'RoleDescription': 'Client Reader',
      'RoleId': '4',
      'Rank': 4
    },
    'AccountList': [
      {
        'Id': 1,
        'AccountName': 'ABB Hongkong Limited (212323)'
      },
      {
        'Id': 2,
        'AccountName': 'Swiss Life (Espana) (232342)'
      },
      {
        'Id': 3,
        'AccountName': 'Farmers Insurance (453412)'
      },
      {
        'Id': 4,
        'AccountName': 'Zenith Insurance (124512)'
      }
    ]
  };
  /*beforeEach(() => {
    mockBackend = fixture.debugElement.injector.get(MockBackend);
    editService=
  });*/


  it('getUser should return Observable<UserDetails>', fakeAsync(
    inject([EditUserService, MockBackend], (editUserService, mockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(testUser)
        })));
      });

      editUserService.getUser(testUser).subscribe((result) => {
        expect(result).toEqual(testUser);
      });
    })));

  it('getUserHandler should return UserDetails', fakeAsync(
    inject([EditUserService, MockBackend], (editUserService, mockBackend) => {
      let userDetail = EditUserHelper.mapToUserDetails(testUser);
      let result = editUserService.getUserHandler(testUser.UserRole, userDetail);
      expect(result instanceof UserDetails).toBeTruthy();;
    })));

  it('updateUser should return boolean', fakeAsync(
    inject([EditUserService, MockBackend], (editUserService, mockBackend) => {
      let selectedUser: UserDetails = EditUserHelper.mapToUserDetails(testUser);
      selectedUser
        .setUserRole(new Role(testUser.UserRole.RoleId, testUser.UserRole.RoleCode, testUser.UserRole.RoleDescription, testUser.UserRole.Rank));

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: true
        })));
      });

      editUserService.updateUser(selectedUser).subscribe((result) => {
        expect(result).toBeTruthy();
      });

    })));

  it('createUser should return boolean', fakeAsync(
    inject([EditUserService, MockBackend], (editUserService, mockBackend) => {
      let selectedUser: UserDetails = EditUserHelper.mapToUserDetails(testUser);
      selectedUser
        .setUserRole(new Role(testUser.UserRole.RoleId, testUser.UserRole.RoleCode, testUser.UserRole.RoleDescription, testUser.UserRole.Rank));
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: true
        })));
      });

      editUserService.createUser(selectedUser).subscribe((result) => {
        expect(result).toBeTruthy();
      });

    })));

  it('getAccountsForUser should return Observable<UserDetails>', fakeAsync(
    inject([EditUserService, MockBackend], (editUserService, mockBackend) => {

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(testUser)
        })));
      });

      editUserService.getAccountsForUser(testUser).subscribe((result) => {
        expect(result).toEqual(testUser);
      });
    })));

  it('getAccountsForUserHandler should return UserDetails', fakeAsync(
    inject([EditUserService, MockBackend], (editUserService, mockBackend) => {
      let userDetail = EditUserHelper.mapToUserDetails(testUser);
      let result = editUserService.getAccountsForUserHandler(testUser.AccountList, userDetail);
      expect(result instanceof UserDetails).toBeTruthy();;
    })));

  it('getAccounts should return Observable<Account>', fakeAsync(
    inject([EditUserService, MockBackend], (editUserService, mockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(accounts)
        })));
      });

      editUserService.getAccounts().subscribe((result) => {
        expect(result).toEqual(accounts);
      });
    })));

  it('getAccountsHandler should return Array<Account>', fakeAsync(
    inject([EditUserService, MockBackend], (editUserService, mockBackend) => {
      let result = editUserService.getAccountsHandler(accounts);
      expect(result[0] instanceof Account).toBeTruthy();;
    })));

  it('getRoles should return Observable<Array<Role>>', fakeAsync(
    inject([EditUserService, MockBackend], (editUserService, mockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(roles)
        })));
      });

      editUserService.getRoles().subscribe((result) => {
        expect(result).toEqual(roles);
      });
    })));

  it('getRolesHandler should return Array<Role>', fakeAsync(
    inject([EditUserService, MockBackend], (editUserService, mockBackend) => {
      let result = editUserService.getRolesHandler(roles);
      expect(result[0] instanceof Role).toBeTruthy();;
    })));

  it('getUserSearchResult should return Observable<Array<UserDetails>>', fakeAsync(
    inject([EditUserService, MockBackend], (editUserService, mockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(userSearchResult)
        })));
      });

      editUserService.getUserSearchResult('search text', 'User Type').subscribe((result) => {
        expect(result).toBe(userSearchResult);
      });
    })));

  it('getUserSearchResultHandler should return Array<UserDetails>', fakeAsync(
    inject([EditUserService, MockBackend], (editUserService, mockBackend) => {
      let result = editUserService.getUserSearchResultHandler(userSearchResult);
      expect(result[0] instanceof UserDetails).toBeTruthy();;
    })));

});


export class RouterStub {
  navigate(url: string) {
    return url;
  }
}


export class MockHttp extends Http {
}

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
  return new Http(xhrBackend, requestOptions);
}


export class EditUserServiceMock {

  getUserSearchResult(searchText: string, userType: string) {
    const result: Array<UserDetails> = new Array<UserDetails>();
    // replace with service code
    userSearchResult.forEach((user) => {
      // create Account List Array
      const userAccountList: Array<Account> = new Array<Account>();
      //console.log(user.AccountList);
      //userAccountList.push(EditUserHelper.mapToAccount(account, AccountActionIndicator.Add));
      const userDetails: UserDetails = EditUserHelper.mapToUserDetails(user);
      userDetails.setUserRole(EditUserHelper.mapToRole(user.UserRole));
      userDetails.setAccountList(userAccountList)
      result.push(userDetails);
    });
    // console.log(result);
    return Observable.of(result);
  }

  getRoles() {
    const result: Array<Role> = new Array<Role>();
    // replace with service code
    roles.forEach((role) => {
      result.push(EditUserHelper.mapToRole(role));
    });
    return Observable.of(result);
  }

  getAccounts() {
    const result: Array<Account> = new Array<Account>();
    // replace with service code
    accounts.forEach((account) => {
      result.push(EditUserHelper.mapToAccount(account, AccountActionIndicator.Remove));
    });
    return Observable.of(result);
  }

  getUser(userDetails: UserDetails): Observable<UserDetails> {
    return Observable.of(userDetails);
  }

  getAccountsForUser(userDetails: UserDetails): Observable<UserDetails> {
    return Observable.of(userDetails);
  }

  createUser(userDetails: UserDetails) {
    return Observable.of(true);
  }

  updateUser(userDetails: UserDetails) {
    return Observable.of(true);
  }

  static getUserDetails(): Array<UserDetails> {
    const result: Array<UserDetails> = new Array<UserDetails>();
    // replace with service code
    userSearchResult.forEach((user) => {
      // create Account List Array
      const userAccountList: Array<Account> = new Array<Account>();
      //console.log(user.AccountList);
      //userAccountList.push(EditUserHelper.mapToAccount(account, AccountActionIndicator.Add));
      const userDetails: UserDetails = EditUserHelper.mapToUserDetails(user);
      userDetails.setUserRole(EditUserHelper.mapToRole(user.UserRole));
      userDetails.setAccountList(userAccountList)
      result.push(userDetails);
    });
    return result;
  }
}

export class LoggedInUserMock {
  PrincipalId: string;
  UserId: string;
  UserRole: Role;

  constructor() {
    this.PrincipalId = 'CD7407A1-B9CF-4A06-852B-9A30533A3655';
    this.UserRole = new Role('1', 'SuperAdmin', 'Super Admin', UserRole.SuperAdministrator);
  }

  getUser() {
    this.UserId = 'CD7407A1-B9CF-4A06-852B-9A30533A3655';
  }

  getRole() {
    return this.UserRole;
  }

  getUserId() {
    return this.UserId;
  }

  getUserPrinicpalId() {
    return this.getUserPrinicpalId;
  }
}
