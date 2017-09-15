import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect, tick, fakeAsync, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing'
import { By } from '@angular/platform-browser';
import { DebugElement, Injector } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpModule, Http, XHRBackend, RequestOptions, ResponseOptions } from '@angular/http';
import { Jquery } from 'jquery';
import { Observable } from 'rxjs/Rx';

import { HomeComponent } from './home.component';
import { HomePageService } from './home.service';
import {EntityAttributeValueResult } from './home.mock.data';
import { Settings } from "app/shared/settings/settings.service";
import {HomePageHelper } from './home.helper';

import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription'
import * as _ from 'lodash';
declare var $: any;


  
describe('Home Page Service', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
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
        HomePageService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
   

  
  it('gethomepageadminText should return Observable<EntityAttributeValue>', fakeAsync(
    inject([HomePageService, MockBackend], (homePageService, mockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(EntityAttributeValueResult)
        })));
      });

      homePageService.gethomepageadminText('entityname').subscribe((result) => {
        expect(result).toBe(EntityAttributeValueResult);
      });
    })));

    it('gethomepageadminText should return Observable<EntityAttributeValue>', fakeAsync(
        inject([HomePageService, MockBackend], (homePageService, mockBackend) => {
        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(EntityAttributeValueResult)
          })));
        });
  
        homePageService.gethomepageadminText('entityname').subscribe((result) => {
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




  


