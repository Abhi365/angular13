import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Observable } from "rxjs/Rx";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { Jquery } from 'jquery';

import { LoggedInUser } from '../shared/loggedInUser/LoggedInUser';
import { Role, UserRole } from '../edit-user/edituser.model';
import { Settings } from '../shared/settings/settings.service';
import { ClientMaintenanceComponent } from './clientmaintenance.component';
import { ClientmaintenanceService } from './clientmaintenance.service';
import { ClientMaintenaceState } from './clientmaintenance.state.service';
import { CreateClientHelper } from './clientmaintenance.helper';
import { ClientService } from '../select-client/client.service';
import { LoaderService } from '../shared/loaderComponent/Loader.service';
import { clientSearchResult, existingClientList, associatedCarriers } from './clientmaintenance.mock.data';
import { PartyInfo, PartyDetails, AssociatedCarrier, Account, AssociationStatus } from './clientmaintenance.model';
import { PaginationComp } from '../shared/pagination/pagination';

describe('ClientMaintenanceComponent', () => {
  let component: ClientMaintenanceComponent;
  let fixture: ComponentFixture<ClientMaintenanceComponent>;
  let clientService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientMaintenanceComponent, PaginationComp],
      imports: [
        FormsModule,
        HttpModule,
      ],
      providers: [
        { provide: Router },
        { provide: ComponentFixtureAutoDetect },
        {
          provide: Http,
          useFactory: httpFactory,
          deps: [XHRBackend, RequestOptions]
        },
        { provide: LoggedInUser, useClass: LoggedInUserMock },
        Settings,
        ClientService,
        ClientMaintenaceState,
        LoaderService,
        { provide: ClientmaintenanceService, useClass: ClientmaintenanceServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMaintenanceComponent);
    component = fixture.componentInstance;
    clientService = fixture.debugElement.injector.get(ClientmaintenanceService);
    fixture.detectChanges();
  });

  describe('Create Functionality Test', () => {
    let createButton;
    let searchButton;
    let resetButton;
    beforeEach(fakeAsync(() => {
      component.loadModal();
      component.showTable();
      fixture.detectChanges();
      tick();
      createButton = fixture.debugElement.query(By.css('button[name=createButton]')).nativeElement;
      searchButton = fixture.debugElement.query(By.css('button[name=searchButton]')).nativeElement;
    }));

    it('Create a Client should call  loadModal Function', fakeAsync(() => {
      spyOn(component, 'loadModal');
      createButton.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();
      expect(component.loadModal).toHaveBeenCalled();
    }));

    it('Search a Company should call showTable function', fakeAsync(() => {
      spyOn(component, 'showTable');
      searchButton.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();
      expect(component.showTable).toHaveBeenCalled();
    }));

    it('Reset Button should call resetSearchModal function', fakeAsync(() => {
      spyOn(component, 'resetSearchModal');
      let resetButton = fixture.debugElement.query(By.css('button[name=resetButton]')).nativeElement;
      resetButton.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();
      expect(component.resetSearchModal).toHaveBeenCalled();
    }));
  });
  describe('Edit Functionality Test', () => {
    let editButton;
    let importButton;
    let cancelButton;
    beforeEach(fakeAsync(() => {
      component.loadModal();
      //component.loadFields();
      fixture.detectChanges();
      tick();
    }));

    it('Edit a Client should call  loadFields Function', fakeAsync(() => {
      spyOn(component, 'loadFields');
      editButton = fixture.debugElement.query(By.css('button[name=editButton]')).nativeElement;
      editButton.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();
      expect(component.loadFields).toHaveBeenCalled();
    }));


    it('Import button should call  getSelectedClientAssociatedCarriers result from service', fakeAsync(() => {
      //   spyOn(clientService, 'getAssociatedCarriers');
      //   importButton = fixture.debugElement.query(By.css('button[name=importButton]')).nativeElement;
      //  importButton.dispatchEvent(new Event ('click'));
      //   fixture.detectChanges();
      //   tick();
      //   expect(clientService.getAssociatedCarriers).toHaveBeenCalled();

      /*
      spyOn(clientService, 'getAssociatedCarriers').and.returnValue(
            Observable.of(associatedCarriers)
          );
          expect(component.associatedCarriers).toBeNull();
          component.showTable();
          fixture.detectChanges();
          expect(component.associatedCarriers).not.toBeNull();
    
      */

    }));

    describe('Cancel activity during any activity in client Maintenance page', () => {
      it('Cancel Function should be called on Click of Cancel Button', fakeAsync(() => {
        spyOn(component, 'cancel');
        let cancelButton = fixture.debugElement.query(By.css('button[name=cancelButton]')).nativeElement;
        cancelButton.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        tick();
        expect(component.cancel).toHaveBeenCalled();
      }));

    });
  });
});

export class RouterStub {
  navigate(url: string) {
    return url;
  }
}

export class ClientmaintenanceServiceMock {

  getclientSearchResult(searchText: string, entityStatus: string, searchCriteria: string) {
    let result: Array<PartyInfo> = new Array<PartyInfo>();
    //replace with service code
    clientSearchResult.forEach((client) => {
      result.push(CreateClientHelper.mapToPartyInfo(client));
    });
    return Observable.of(result);
  }

  getListOfParties() {
    let result: Array<PartyDetails> = new Array<PartyDetails>();
    existingClientList.forEach((existing) => {
      result.push(CreateClientHelper.mapToPartyDetails(existing));
    });
    return Observable.of(result);
  }

  getAssociatedCarriers() {
    let result: Array<AssociatedCarrier> = new Array<AssociatedCarrier>();
    associatedCarriers.forEach((carrier) => {
      result.push(CreateClientHelper.mapToAssociatedCarrier(carrier, AssociationStatus.None));
    });
    return Observable.of(result);
  }
}


export class MockHttp extends Http {
}
export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
  return new Http(xhrBackend, requestOptions);
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