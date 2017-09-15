import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect, tick, fakeAsync, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing'
import { By } from '@angular/platform-browser';
import { DebugElement, Injector } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpModule, Http, XHRBackend, RequestOptions, ResponseOptions } from '@angular/http';
import { Jquery } from 'jquery';
import { Observable } from 'rxjs/Rx';

import { AnnouncementsComponent } from './announcements.component';
import { AnnouncementsService } from './announcements.service';
import { Announcement, Account} from './announcements.model';
import { annoucementsSearchResult, accounts } from './announcements.mock.data';
import { Settings } from "app/shared/settings/settings.service";
import { AnnouncementsHelper } from './announcements.helper';

declare var $: any;

describe('AnnouncementsComponent', () => {
  
    let component: AnnouncementsComponent;
    let fixture: ComponentFixture<AnnouncementsComponent>;
    let announcementsService;
    beforeEach(async () => {
      TestBed.configureTestingModule({
        declarations: [AnnouncementsComponent],
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
          AnnouncementsService
        ]
      }).overrideComponent(AnnouncementsComponent, {
        set: {
          providers: [
            { provide: AnnouncementsService, useClass:AnnouncementsServiceMock }
          ]
        }
      })
        .compileComponents();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(AnnouncementsComponent);
      component = fixture.componentInstance;
      announcementsService = fixture.debugElement.injector.get(AnnouncementsService);
      fixture.detectChanges();
     
    });
  
    describe('Click Functionality Test', () => {
      
      beforeEach(fakeAsync(() => {
        fixture.detectChanges();
        tick();
        
      }));

      it('Edit Button should call Edit Announcement function', fakeAsync(() => {
        spyOn(component, 'EditAnnouncement');
        component.announcementId = "1";
        
        fixture.detectChanges();
        tick();
        const editButton = fixture.debugElement.query(By.css('td[name=editButton]')).nativeElement;
        editButton.dispatchEvent(new Event('click'));
        expect(component.EditAnnouncement).toHaveBeenCalled();
      }));

      it('Delete Button should call Delete Announcement function', fakeAsync(() => {
        spyOn(component, 'DeleteAnnouncement');
        fixture.detectChanges();
        tick();
        const deleteButton = fixture.debugElement.query(By.css('td[name=deleteButton]')).nativeElement;
        deleteButton.dispatchEvent(new Event('click'));
        expect(component.DeleteAnnouncement).toHaveBeenCalled();
      }));

      it('Create Button should call display function', fakeAsync(() => {
        spyOn(component, 'displayinputDetails');
        fixture.detectChanges();
        tick();
        const createButton = fixture.debugElement.query(By.css('button[name=createButton]')).nativeElement;
        createButton.dispatchEvent(new Event('click'));
        expect(component.displayinputDetails).toHaveBeenCalled();
      }));
            it('Save Button should call Save record function', fakeAsync(() => {
              spyOn(component, 'saverecord');
              component.announcementId = "";
              component.isCreateAnnouncementVisible=true;
              fixture.detectChanges();
              tick();
              const saveButton = fixture.debugElement.query(By.css('button[name=saveButton]')).nativeElement;
              saveButton.dispatchEvent(new Event('click'));
              expect(component.saverecord).toHaveBeenCalled();
            }));

           

            it('Cancel Button should call home page function', fakeAsync(() => {
              spyOn(component, 'getHomepage');
              component.isCreateAnnouncementVisible=true;
              fixture.detectChanges();
              tick();
              const cancelButton = fixture.debugElement.query(By.css('button[name=cancelButton]')).nativeElement;
              cancelButton.dispatchEvent(new Event('click'));
              expect(component.getHomepage).toHaveBeenCalled();
            }));

            it('Exit Button should call home page function', fakeAsync(() => {
              spyOn(component, 'getHomepage');
              component.isCreateAnnouncementVisible=true;
              fixture.detectChanges();
              tick();
              const exitButton = fixture.debugElement.query(By.css('button[name=exitButton]')).nativeElement;
              exitButton.dispatchEvent(new Event('click'));
              expect(component.getHomepage).toHaveBeenCalled();
            }));

            it('Add Client Name Button should call add client name function', fakeAsync(() => {
              spyOn(component, 'addClientName');
              component.isCreateAnnouncementVisible=true;
              component.iseditTable=true;
              fixture.detectChanges();
              tick();
              const addClientNameButton = fixture.debugElement.query(By.css('img[name=addClientNameButton]')).nativeElement;
              addClientNameButton.dispatchEvent(new Event('click'));
              expect(component.addClientName).toHaveBeenCalled();
            }));

            it('Remove Client Name Button should call remove client name function', fakeAsync(() => {
              spyOn(component, 'removeClientName');
              component.isCreateAnnouncementVisible=true;
              component.iseditTable=true;
              fixture.detectChanges();
              tick();
              const removeClientNameButton = fixture.debugElement.query(By.css('img[name=removeClientNameButton]')).nativeElement;
              removeClientNameButton.dispatchEvent(new Event('click'));
              expect(component.removeClientName).toHaveBeenCalled();
            }));

            it('Yes/No checkbox chnage should call set assign user function', fakeAsync(() => {
              spyOn(component, 'setAssignUser');
              component.isCreateAnnouncementVisible=true;
              component.iseditTable=true;
              fixture.detectChanges();
              tick();
              const assignUserButton = fixture.debugElement.query(By.css('input[name=assignUser]')).nativeElement;
              assignUserButton.dispatchEvent(new Event('change'));
              expect(component.setAssignUser).toHaveBeenCalled();
            }));

            it('Save Button should call Create record function', fakeAsync(() => {
              spyOn(component, 'createAnnouncement');
              component.announcementId = undefined;
              component.isCreateAnnouncementVisible=true;
              fixture.detectChanges();
              tick();
              const saveButton = fixture.debugElement.query(By.css('button[name=saveButton]')).nativeElement;
              saveButton.dispatchEvent(new Event('click'));
              expect(component.createAnnouncement).toHaveBeenCalled();
            }));

            it('Save Button should call Update record function', fakeAsync(() => {
              spyOn(component, 'updateAnnouncement');
              component.announcementId = "1";
              component.isCreateAnnouncementVisible=true;
              fixture.detectChanges();
              tick();
              const saveButton = fixture.debugElement.query(By.css('button[name=saveButton]')).nativeElement;
              saveButton.dispatchEvent(new Event('click'));
              expect(component.updateAnnouncement).toHaveBeenCalled();
            }));


        


  });





});
  
describe('Announcement Service', () => {
  let component: AnnouncementsComponent;
  let fixture: ComponentFixture<AnnouncementsComponent>;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AnnouncementsComponent],
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
        AnnouncementsService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  const testannoucementsSearchResult = {
    "Title": 'New Carriers added',
    "Description": "New carriers have been added",
    "Expirydate": "Aug 2,2017",
    "DocLink": "Abc",
    "ExtLink": "XYZ",
    "clients": "",
    "AnnouncementId": "1"
    }
    const testaccounts = 
      {
          'Id': 1,
          'PartyName': 'ABB Hongkong Limited (212323)'
      }


  
  it('getAnnouncements should return Observable<AnnouncementsInfo>', fakeAsync(
    inject([AnnouncementsService, MockBackend], (announcementsService, mockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(testannoucementsSearchResult)
        })));
      });

      announcementsService.getAnnouncements(testannoucementsSearchResult).subscribe((result) => {
        expect(result).toEqual(testannoucementsSearchResult);
      });
    })));

    it('getAnnouncements should return Observable<AnnouncementsInfo>', fakeAsync(
      inject([AnnouncementsService, MockBackend], (announcementsService, mockBackend) => {
        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(testannoucementsSearchResult)
          })));
        });
  
        announcementsService.getAnnouncements(testannoucementsSearchResult).subscribe((result) => {
          expect(result).toBeTruthy();
        });
      })));
      it('getAccounts should return Observable<Account>', fakeAsync(
        inject([AnnouncementsService, MockBackend], (announcementsService, mockBackend) => {
          mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
              body: JSON.stringify(testaccounts)
            })));
          });
      
          announcementsService.getAccounts(testaccounts).subscribe((result) => {
            expect(result).toEqual(testaccounts);
          });
        })));
      
      
        it('getAccounts should return Observable<Account>', fakeAsync(
          inject([AnnouncementsService, MockBackend], (announcementsService, mockBackend) => {
            mockBackend.connections.subscribe((connection) => {
              connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(testaccounts)
              })));
            });
      
            announcementsService.getAccounts(testaccounts).subscribe((result) => {
              expect(result).toBeTruthy();
            });
          })));
      
      
      
          it('createAnnouncement should return boolean', fakeAsync(
            inject([AnnouncementsService, MockBackend], (announcementsService, mockBackend) => {
              //let selectedAnnoucment: AnnouncementsInfo = AnnouncementsHelper.mapToAnnouncementsInfo(testannoucementsSearchResult);
              let title="Abc";
              let description = "Xyz";
              let docLink="";
              let extLink ="";
              let expiryDate="01/05/2017";
              let clients="";
              mockBackend.connections.subscribe((connection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                  body: true
                })));
              });
              //CreateAnnouncement(this.title, this.description, this.docLink, this.extLink, this.expiryDate, this.clients)
              announcementsService.CreateAnnouncement(title,description,docLink,extLink,expiryDate,clients).subscribe((result) => {
                expect(result).toBeTruthy();
              });
        
            })));
      
      
            it('Update should return boolean', fakeAsync(
              inject([AnnouncementsService, MockBackend], (announcementsService, mockBackend) => {
                let title = "New Carriers added";
                let description = "New carriers have been added";
                let expiryDate = "01/05/2017";
                let AnnouncementId = "1";
                //let selectedAnnoucment: AnnouncementsInfo = AnnouncementsHelper.mapToAnnouncementsInfo(testannoucementsSearchResult);
                mockBackend.connections.subscribe((connection) => {
                  connection.mockRespond(new Response(new ResponseOptions({
                    body: true
                  })));
                });
          
                announcementsService.UpdateAnnouncement(title,description,expiryDate,AnnouncementId).subscribe((result) => {
                  expect(result).toBeTruthy();
                });
          
              })));
      
              it('getAnnoucementSearchResult by Id should return Observable<Array<AnnouncementsInfo>>', fakeAsync(
                inject([AnnouncementsService, MockBackend], (announcementsService, mockBackend) => {
                  mockBackend.connections.subscribe((connection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                      body: JSON.stringify(testannoucementsSearchResult)
                    })));
                  });
            
                  announcementsService.getAnnouncementsById('announcement Id').subscribe((result) => {
                    expect(result).toBe(testannoucementsSearchResult);
                  });
                })));
      
      
                it('getAnnoucementSearchResult by Id should return Observable<Array<AnnouncementsInfo>>', fakeAsync(
                  inject([AnnouncementsService, MockBackend], (announcementsService, mockBackend) => {
                    mockBackend.connections.subscribe((connection) => {
                      connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(testannoucementsSearchResult)
                      })));
                    });
              
                    announcementsService.getAnnouncementsById('announcement Id').subscribe((result) => {
                      expect(result).toBeTruthy();
                    });
                  })));
      
      
               it('deleteannoucenemt should return boolean', fakeAsync(
                 inject([AnnouncementsService, MockBackend], (announcementsService, mockBackend) => {
                  mockBackend.connections.subscribe((connection) => {
                  connection.mockRespond(new Response(new ResponseOptions({
                    body: true
                })));
              });
        
              announcementsService.DeleteAnnouncement('announcement Id').subscribe((result) => {
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




export class AnnouncementsServiceMock {

    getAccounts(account){
      return Observable.of(account);
    }
  
    getAnnouncements(annoucementsSearchResult) {
      return Observable.of(annoucementsSearchResult);
    }

    getAnnouncementsById(AnnouncementId: string,annoucementsSearchResult) {
      return Observable.of(annoucementsSearchResult);
    }
  
    createAnnouncement(annoucementsSearchResult) {
      return Observable.of(true);
    }
  
    updateAnnouncement(annoucementsSearchResult) {
      return Observable.of(true);
    }
  
    DeleteAnnouncement(AnnouncementId: string) {
      return Observable.of(true);
    }
  }





  

