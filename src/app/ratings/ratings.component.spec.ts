import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect, tick, fakeAsync, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing'
import { By } from '@angular/platform-browser';
import { DebugElement, Injector } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpModule, Http, XHRBackend, RequestOptions, ResponseOptions } from '@angular/http';
import { Jquery } from 'jquery';
import { Observable } from 'rxjs/Rx';

import { RatingsComponent } from './ratings.component';
import { RatingAgencyScaleSummaryService } from './ratings.service';
import { RatingAgencyScaleSummaryHelper } from './ratings.helper';
import { RatingAgencyScaleSummary } from './ratings.model';
import { ratingAgencyScaleSummaryResult } from './ratings.mock.data';
import { Settings } from "app/shared/settings/settings.service";





describe('Ratings Component Service', () => {
  let component: RatingsComponent;
  let fixture: ComponentFixture<RatingsComponent>;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [RatingsComponent],
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
        RatingAgencyScaleSummaryService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  const  testratingAgencyScaleSummaryResult = [
    {
        "AMBest": "A++",
        "SP": "AAA",
        "Moody": "Aaa",
        "Fitch": "aaaa"
    },
    {
        "AMBest": "B++",
        "SP": "BBB",
        "Moody": "Bbb",
        "Fitch": "bbbb"
    }]
    


  
  it('getRatingAgencyScaleSummary should return Observable<RatingAgencyScaleSummary>', fakeAsync(
    inject([RatingAgencyScaleSummaryService, MockBackend], (ratingAgencyScaleSummaryService, mockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(testratingAgencyScaleSummaryResult)
        })));
      });

      ratingAgencyScaleSummaryService.getRatingAgencyScaleSummary(testratingAgencyScaleSummaryResult).subscribe((result) => {
        expect(result).toEqual(testratingAgencyScaleSummaryResult);
      });
    })));

    it('getRatingAgencyScaleSummary should return Observable<RatingAgencyScaleSummary>', fakeAsync(
      inject([RatingAgencyScaleSummaryService, MockBackend], (ratingAgencyScaleSummaryService, mockBackend) => {
        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(testratingAgencyScaleSummaryResult)
          })));
        });
  
        ratingAgencyScaleSummaryService.getRatingAgencyScaleSummary(testratingAgencyScaleSummaryResult).subscribe((result) => {
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
