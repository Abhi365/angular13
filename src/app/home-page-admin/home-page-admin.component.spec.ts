import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect, tick, fakeAsync, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing'
import { By } from '@angular/platform-browser';
import { DebugElement, Injector } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpModule, Http, XHRBackend, RequestOptions, ResponseOptions } from '@angular/http';
import { Jquery } from 'jquery';
import { Observable } from 'rxjs/Rx';

import { HomePageAdminComponent } from './home-page-admin.component';
import { HomePageAdminService } from './home-page-admin.service';
import {EntityAttributeValueResult } from './home-page-admin.mock.data';
import { Settings } from "app/shared/settings/settings.service";
import {HomePageAdminHelper } from './home-page-admin.helper';

import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription'
import * as _ from 'lodash';
declare var $: any;


  
describe('Home Page Admin Service', () => {
  let component: HomePageAdminComponent;
  let fixture: ComponentFixture<HomePageAdminComponent>;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [HomePageAdminComponent],
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
        { provide: XHRBackend, useClass: MockBackend },
        MockBackend,
        HomePageAdminService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
   

  
  it('gethomepageadminText should return Observable<EntityAttributeValue>', fakeAsync(
    inject([HomePageAdminService, MockBackend], (homePageAdminService, mockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(EntityAttributeValueResult)
        })));
      });

      homePageAdminService.gethomepageadminText('entityname').subscribe((result) => {
        expect(result).toBe(EntityAttributeValueResult);
      });
    })));

    it('gethomepageadminText should return Observable<EntityAttributeValue>', fakeAsync(
      inject([HomePageAdminService, MockBackend], (homePageAdminService, mockBackend) => {
        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(EntityAttributeValueResult)
          })));
        });
  
        homePageAdminService.gethomepageadminText('entityname').subscribe((result) => {
          expect(result).toBeTruthy();
        });
      })));

      
            it('UpdateHomepageadminText should return boolean', fakeAsync(
              inject([HomePageAdminService, MockBackend], (homePageAdminService, mockBackend) => {
                let Value="Abc";
                let entityname = "HomePageAdmin";
               
                mockBackend.connections.subscribe((connection) => {
                  connection.mockRespond(new Response(new ResponseOptions({
                    body: true
                  })));
                });
                homePageAdminService.UpdateHomepageadminText(Value,entityname).subscribe((result) => {
                  expect(result).toBeTruthy();
                });
          
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


// export class AnnouncementsServiceMock {

//     getAccounts(account: Account): Observable<Account> {
//       return Observable.of(account);
//     }
  
//     getAnnouncements(annoucementsSearchResult: AnnouncementsInfo): Observable<AnnouncementsInfo> {
//       return Observable.of(annoucementsSearchResult);
//     }

//     getAnnouncementsById(AnnouncementId: string,annoucementsSearchResult: AnnouncementsInfo): Observable<AnnouncementsInfo> {
//       return Observable.of(annoucementsSearchResult);
//     }
  
//     createAnnouncement(annoucementsSearchResult: AnnouncementsInfo) {
//       return Observable.of(true);
//     }
  
//     updateAnnouncement(annoucementsSearchResult: AnnouncementsInfo) {
//       return Observable.of(true);
//     }
  
//     DeleteAnnouncement(AnnouncementId: string) {
//       return Observable.of(true);
//     }
//   }




  


