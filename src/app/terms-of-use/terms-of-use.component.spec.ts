import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect, tick, fakeAsync, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing'
import { By } from '@angular/platform-browser';
import { DebugElement, Injector } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpModule, Http, XHRBackend, RequestOptions, ResponseOptions } from '@angular/http';
import { Jquery } from 'jquery';
import { Observable } from 'rxjs/Rx';

import { TermsOfUseComponent } from './terms-of-use.component';
import { TermsOfUseService } from './terms-of-use.service';
import {TermsOfUse} from './terms-of-use.model';
import {TermsOfUseResult } from './terms-of-use.mock.data';
import { Settings } from "app/shared/settings/settings.service";
import {TermsOfUseHelper } from './terms-of-use.helper';

import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription'
import * as _ from 'lodash';
declare var $: any;

// describe('TermsOfUseComponent', () => {
  
//     let component: TermsOfUseComponent;
//     let fixture: ComponentFixture<TermsOfUseComponent>;
//     let TermsOfUseService;
//     beforeEach(async () => {
//       TestBed.configureTestingModule({
//         declarations: [TermsOfUseComponent],
//         imports: [
//           FormsModule,
//           HttpModule
//         ],
//         providers: [
//           { provide: Router, useClass: RouterStub },
//           { provide: ComponentFixtureAutoDetect, useValue: true },
//           {
//             provide: Http,
//             useFactory: httpFactory,
//             deps: [XHRBackend, RequestOptions]
//           },
//           Settings,
//           { provide: XHRBackend, useClass: MockBackend },
//           MockBackend,
//           AnnouncementsService
//         ]
//       }).overrideComponent(TermsOfUseComponent, {
//         set: {
//           providers: [
//             { provide: AnnouncementsService, useClass:AnnouncementsServiceMock }
//           ]
//         }
//       })
//         .compileComponents();
//     });
  
//     beforeEach(() => {
//       fixture = TestBed.createComponent(AnnouncementsComponent);
//       component = fixture.componentInstance;
//       announcementsService = fixture.debugElement.injector.get(AnnouncementsService);
//       fixture.detectChanges();
     
//     });
  
//     describe('Click Functionality Test', () => {
      
//       beforeEach(fakeAsync(() => {
//         fixture.detectChanges();
//         tick();
        
//       }));

//       it('Edit Button should call Edit Announcement function', fakeAsync(() => {
//         spyOn(component, 'EditAnnouncement');
//         component.announcementId = "1";
        
//         fixture.detectChanges();
//         tick();
//         const editButton = fixture.debugElement.query(By.css('td[name=editButton]')).nativeElement;
//         editButton.dispatchEvent(new Event('click'));
//         expect(component.EditAnnouncement).toHaveBeenCalled();
//       }));

//       it('Delete Button should call Delete Announcement function', fakeAsync(() => {
//         spyOn(component, 'DeleteAnnouncement');
//         fixture.detectChanges();
//         tick();
//         const deleteButton = fixture.debugElement.query(By.css('td[name=deleteButton]')).nativeElement;
//         deleteButton.dispatchEvent(new Event('click'));
//         expect(component.DeleteAnnouncement).toHaveBeenCalled();
//       }));

//       it('Create Button should call display function', fakeAsync(() => {
//         spyOn(component, 'displayinputDetails');
//         fixture.detectChanges();
//         tick();
//         const createButton = fixture.debugElement.query(By.css('button[name=createButton]')).nativeElement;
//         createButton.dispatchEvent(new Event('click'));
//         expect(component.displayinputDetails).toHaveBeenCalled();
//       }));
//             it('Save Button should call Save record function', fakeAsync(() => {
//               spyOn(component, 'saverecord');
//               component.announcementId = "";
//               component.isCreateAnnouncementVisible=true;
//               fixture.detectChanges();
//               tick();
//               const saveButton = fixture.debugElement.query(By.css('button[name=saveButton]')).nativeElement;
//               saveButton.dispatchEvent(new Event('click'));
//               expect(component.saverecord).toHaveBeenCalled();
//             }));

           

//             it('Cancel Button should call home page function', fakeAsync(() => {
//               spyOn(component, 'getHomepage');
//               component.isCreateAnnouncementVisible=true;
//               fixture.detectChanges();
//               tick();
//               const cancelButton = fixture.debugElement.query(By.css('button[name=cancelButton]')).nativeElement;
//               cancelButton.dispatchEvent(new Event('click'));
//               expect(component.getHomepage).toHaveBeenCalled();
//             }));

//             it('Exit Button should call home page function', fakeAsync(() => {
//               spyOn(component, 'getHomepage');
//               component.isCreateAnnouncementVisible=true;
//               fixture.detectChanges();
//               tick();
//               const exitButton = fixture.debugElement.query(By.css('button[name=exitButton]')).nativeElement;
//               exitButton.dispatchEvent(new Event('click'));
//               expect(component.getHomepage).toHaveBeenCalled();
//             }));

//             it('Add Client Name Button should call add client name function', fakeAsync(() => {
//               spyOn(component, 'addClientName');
//               component.isCreateAnnouncementVisible=true;
//               component.iseditTable=true;
//               fixture.detectChanges();
//               tick();
//               const addClientNameButton = fixture.debugElement.query(By.css('img[name=addClientNameButton]')).nativeElement;
//               addClientNameButton.dispatchEvent(new Event('click'));
//               expect(component.addClientName).toHaveBeenCalled();
//             }));

//             it('Remove Client Name Button should call remove client name function', fakeAsync(() => {
//               spyOn(component, 'removeClientName');
//               component.isCreateAnnouncementVisible=true;
//               component.iseditTable=true;
//               fixture.detectChanges();
//               tick();
//               const removeClientNameButton = fixture.debugElement.query(By.css('img[name=removeClientNameButton]')).nativeElement;
//               removeClientNameButton.dispatchEvent(new Event('click'));
//               expect(component.removeClientName).toHaveBeenCalled();
//             }));

//             it('Yes/No checkbox chnage should call set assign user function', fakeAsync(() => {
//               spyOn(component, 'setAssignUser');
//               component.isCreateAnnouncementVisible=true;
//               component.iseditTable=true;
//               fixture.detectChanges();
//               tick();
//               const assignUserButton = fixture.debugElement.query(By.css('input[name=assignUser]')).nativeElement;
//               assignUserButton.dispatchEvent(new Event('change'));
//               expect(component.setAssignUser).toHaveBeenCalled();
//             }));

//             it('Save Button should call Create record function', fakeAsync(() => {
//               spyOn(component, 'createAnnouncement');
//               component.announcementId = undefined;
//               component.isCreateAnnouncementVisible=true;
//               fixture.detectChanges();
//               tick();
//               const saveButton = fixture.debugElement.query(By.css('button[name=saveButton]')).nativeElement;
//               saveButton.dispatchEvent(new Event('click'));
//               expect(component.createAnnouncement).toHaveBeenCalled();
//             }));

//             it('Save Button should call Update record function', fakeAsync(() => {
//               spyOn(component, 'updateAnnouncement');
//               component.announcementId = "1";
//               component.isCreateAnnouncementVisible=true;
//               fixture.detectChanges();
//               tick();
//               const saveButton = fixture.debugElement.query(By.css('button[name=saveButton]')).nativeElement;
//               saveButton.dispatchEvent(new Event('click'));
//               expect(component.updateAnnouncement).toHaveBeenCalled();
//             }));

        

//   });




// });
  
describe('Terms Of Use Service', () => {
  let component: TermsOfUseComponent;
  let fixture: ComponentFixture<TermsOfUseComponent>;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TermsOfUseComponent],
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
        TermsOfUseService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsOfUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
   

  
  it('getalltermsofuse should return Observable<TermsOfUse>', fakeAsync(
    inject([TermsOfUseService, MockBackend], (termsOfUseService, mockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(TermsOfUseResult)
        })));
      });

      termsOfUseService.getalltermsofuse(TermsOfUseResult).subscribe((result) => {
        expect(result).toEqual(TermsOfUseResult);
      });
    })));

    it('getalltermsofuse should return Observable<TermsOfUse>', fakeAsync(
        inject([TermsOfUseService, MockBackend], (termsOfUseService, mockBackend) => {
        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(TermsOfUseResult)
          })));
        });
  
        termsOfUseService.getalltermsofuse(TermsOfUseResult).subscribe((result) => {
          expect(result).toBeTruthy();
        });
      })));

      it('gettermsofuseByVersion by version should return Observable<TermsOfUse>', fakeAsync(
        inject([TermsOfUseService, MockBackend], (termsOfUseService, mockBackend) => {
          mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
              body: JSON.stringify(TermsOfUseResult)
            })));
          });
    
          termsOfUseService.gettermsofuseByVersion('version').subscribe((result) => {
            expect(result).toBe(TermsOfUseResult);
          });
        })));


        it('gettermsofuseByVersion by version should return Observable<TermsOfUse>', fakeAsync(
          inject([TermsOfUseService, MockBackend], (termsOfUseService, mockBackend) => {
            mockBackend.connections.subscribe((connection) => {
              connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(TermsOfUseResult)
              })));
            });
      
            termsOfUseService.gettermsofuseByVersion('version').subscribe((result) => {
              expect(result).toBeTruthy();
            });
          })));
      
          it('gettermsofuseByCurrentVersion should return Observable<TermsOfUse>', fakeAsync(
            inject([TermsOfUseService, MockBackend], (termsOfUseService, mockBackend) => {
              mockBackend.connections.subscribe((connection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                  body: JSON.stringify(TermsOfUseResult)
                })));
              });
        
              termsOfUseService.gettermsofuseByCurrentVersion(TermsOfUseResult).subscribe((result) => {
                expect(result).toEqual(TermsOfUseResult);
              });
            })));
        
            it('gettermsofuseByCurrentVersion should return Observable<TermsOfUse>', fakeAsync(
                inject([TermsOfUseService, MockBackend], (termsOfUseService, mockBackend) => {
                mockBackend.connections.subscribe((connection) => {
                  connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(TermsOfUseResult)
                  })));
                });
          
                termsOfUseService.gettermsofuseByCurrentVersion(TermsOfUseResult).subscribe((result) => {
                  expect(result).toBeTruthy();
                });
              })));
      
          it('CreateTermsOfUseText should return Id', fakeAsync(
            inject([TermsOfUseService, MockBackend], (termsOfUseService, mockBackend) => {
              //let selectedAnnoucment: AnnouncementsInfo = AnnouncementsHelper.mapToAnnouncementsInfo(testannoucementsSearchResult);
              let TermsOfUseText="Abc";
              let Version = 1;
             
              mockBackend.connections.subscribe((connection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                  body: true
                })));
              });
              termsOfUseService.CreateTermsOfUseText(TermsOfUseText,Version).subscribe((result) => {
                expect(result).toBeTruthy();
              });
        
            })));
      
      
            it('UpdateTermsOfUseText should return boolean', fakeAsync(
              inject([TermsOfUseService, MockBackend], (termsOfUseService, mockBackend) => {
                let TermsOfUseText="Abc";
                let Version = 1;
               
                mockBackend.connections.subscribe((connection) => {
                  connection.mockRespond(new Response(new ResponseOptions({
                    body: true
                  })));
                });
                termsOfUseService.UpdateTermsOfUseText(TermsOfUseText,Version).subscribe((result) => {
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




  


