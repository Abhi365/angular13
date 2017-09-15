import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect, fakeAsync, inject } from '@angular/core/testing';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing'
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { CarriersearchComponent } from './carriersearch.component';
import { CarrierSearchService } from './carriersearch.service';
import { SearchRequest } from './carriersearch.model';
import { ClientService } from '../select-client/client.service';
import { LoaderService } from '../shared/loaderComponent/Loader.service';
import { LoggedInUser } from '../shared/loggedInUser/LoggedInUser';
import { LoggedInUserMock } from '../shared/loggedInUser/LoggedInUser.spec';
import { httpFactory, MockHttp } from '../shared/http/http.factory.spec';

import {
  countries, states, searchResult, approvalStatuses, businessUnits, companyTypes, legalEntities,
  licenceTypes, operatingCategories, ownerships, qualifiers, ratingAgencies, ratingAgencyScales, restrictions
} from './carriersearch.mock.data';

describe('CarriersearchComponent', () => {
  let component: CarriersearchComponent;
  let fixture: ComponentFixture<CarriersearchComponent>;


  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CarriersearchComponent],
      imports: [
        HttpModule,
        FormsModule
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ComponentFixtureAutoDetect, useValue: true },
        {
          provide: Http,
          useFactory: httpFactory,
          deps: [XHRBackend, RequestOptions]
        },
        ClientService,
        LoaderService,
        { provide: LoggedInUser, useClass: LoggedInUserMock },
        { provide: XHRBackend, useClass: MockBackend },
        MockBackend
      ]
    }).overrideComponent(CarriersearchComponent, {
      set: {
        providers: [
          { provide: CarrierSearchService, useClass: CarrierSearchServiceMock }
        ]
      }
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarriersearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
describe('Checking for initialisation in constuctor',() => {
  it('Calls all Initialization Code for Dropdowns', fakeAsync(() => {
    spyOn(component, 'getCountry');
    spyOn(component, 'getApprovalStatus');
    spyOn(component, 'getOwnerships');
    spyOn(component, 'getCompanyType');
    spyOn(component, 'getBusinessUnit');
    spyOn(component, 'getOperatingCategory');
    spyOn(component, 'getRestriction');
    spyOn(component, 'getLegalEntity');
    spyOn(component, 'getRatingAgencies');
    spyOn(component, 'getLicenceCountry');
    spyOn(component, 'getQualifier');
    spyOn(component, 'reset');
    component.initialization();
    expect(component.getCountry).toHaveBeenCalled();
    expect(component.getApprovalStatus).toHaveBeenCalled();
    expect(component.getOwnerships).toHaveBeenCalled();
    expect(component.getCompanyType).toHaveBeenCalled();
    expect(component.getBusinessUnit).toHaveBeenCalled();
    expect(component.getOperatingCategory).toHaveBeenCalled();
    expect(component.getRestriction).toHaveBeenCalled();
    expect(component.getLegalEntity).toHaveBeenCalled();
    expect(component.getRatingAgencies).toHaveBeenCalled();
    expect(component.getLicenceCountry).toHaveBeenCalled();
    expect(component.getQualifier).toHaveBeenCalled();
    expect(component.reset).toHaveBeenCalled();
  }));
  
});

});


export class RouterStub {
  navigate(url: string) {
    return url;
  }
}

export class CarrierSearchServiceMock {
  getCountries() {
    return Observable.of(countries);
  }

  getStates(countryId: number) {
    return Observable.of(states);
  }

  getApprovalStatus() {
    return Observable.of(approvalStatuses);
  }

  getOwnerships() {
    return Observable.of(ownerships);
  }

  getCompanyTypes() {
    return Observable.of(companyTypes);
  }

  getBusinessUnits() {
    return Observable.of(businessUnits);
  }

  getQualifiers() {
    return Observable.of(qualifiers);
  }

  getOperatingCategories() {
    return Observable.of(operatingCategories);
  }

  getRestrictions() {
    return Observable.of(restrictions);
  }

  getLegalEntities() {
    return Observable.of(legalEntities);
  }

  getRatingAgencies() {
    return Observable.of(ratingAgencies);
  }

  getLicenceCountries() {
    return Observable.of(countries);
  }


  getLicenceStates(countryId: number) {
    return Observable.of(states);
  }

  getLicenceTypes(countryId: number) {
    return Observable.of(licenceTypes);
  }

  // get Rating Agencies
  getRatingAgencyScales(ratingAgencyId: number) {
    return Observable.of(ratingAgencyScales);
  }

  // get Search Result
  getSearchResult(searchRequest: SearchRequest) {
    return Observable.of(searchResult);
  }
}