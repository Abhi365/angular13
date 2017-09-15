import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend, RequestOptions, Http } from '@angular/http';
import {AgGridModule} from "ag-grid-angular/main";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { RatingsComponent } from './ratings/ratings.component';
import { routing } from './routing';
import { DisclaimersComponent } from './disclaimers/disclaimers.component';
import { EdituserComponent } from './edit-user/edituser.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { CarriersearchComponent } from './carrier-search/carriersearch.component';
import { NotificationComponent } from './notification/notification.component';
import { CarrierDocComponent } from './carrier-doc/carrier-doc.component';
import { HomePageAdminComponent } from './home-page-admin/home-page-admin.component';
import { CarrierFavoritesComponent } from './carrier-favorites/carrierfavorites.component';
import { ClientMaintenanceComponent } from './client-maintenance/clientmaintenance.component';
import { ClientMaintenaceState } from './client-maintenance/clientmaintenance.state.service';
import { DocAccessComponent } from './doc-access/doc-access.component';
import { DocFolderComponent } from './doc-folder/doc-folder.component';
import { ReportsComponent } from './reports/reports.component';
import { MsHomeComponent } from './ms-home/ms-home.component';
import { SelectClient } from './select-client/select-client.component';
import { CarrierDetailsComponent } from './carrier-details/carrier-details.component';
import { DocumentsComponent } from './carrier-details/documents/documents.component';
import { FinancialsComponent } from './carrier-details/financials/financials.component';
import { GeneralComponent } from './carrier-details/general/general.component';
import { LicensesComponent } from './carrier-details/licenses/licenses.component';
import { SummaryComponent } from './carrier-details/summary/summary.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
// shared Modules
import { Settings, SettingsFactory } from './shared/settings/settings.service';
//import { Storage } from './shared/storage/storage.service';
import { httpFactory } from './shared/http/http.factory'
import { NiceSelectDirective } from './shared/niceSelect/niceSelect';
import { LoaderComponent } from './shared/loaderComponent/loader.component';
import { LoaderService } from './shared/loaderComponent/Loader.service';
import { LoggedInUser } from './shared/loggedInUser/LoggedInUser';
import { PaginationComp } from './shared/pagination/pagination';
import { LinkComponent } from './carrier-search/link-component/link-component.component';
import { CheckComponent } from './carrier-search/check/check.component';
import { DatepickerComponent } from './shared/datepicker/datepicker.component';
//import { MessageHandler } from './shared/message-handler/message.handler';

//Auth Guards
import { ClientAuthGuard } from './app.client.auth.guard';
import { ClientService } from './select-client/client.service';
import { CarrierFavoritesAdminComponent } from './carrier-favorites-admin/carrier-favorites-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    RatingsComponent,
    DisclaimersComponent,
    EdituserComponent,
    AnnouncementsComponent,
    CarriersearchComponent,
    NotificationComponent,
    CarrierDocComponent,
    HomePageAdminComponent,
    CarrierFavoritesComponent,
    ClientMaintenanceComponent,
    DocAccessComponent,
    DocFolderComponent,
    ReportsComponent,
    MsHomeComponent,
    NiceSelectDirective,
    LoaderComponent,
    PaginationComp,
    SelectClient,
    CarrierDetailsComponent,
    SummaryComponent,
    FinancialsComponent,
    DocumentsComponent,
    LicensesComponent,
    GeneralComponent,
    TermsOfUseComponent,
    LinkComponent,
    CheckComponent,
    DatepickerComponent,
    CarrierFavoritesAdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
     AgGridModule.withComponents(
            [LinkComponent,CheckComponent]
        )
  ],
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    },
    Settings,
    {
      provide: APP_INITIALIZER,
      useFactory: SettingsFactory,
      deps: [Settings],
      multi: true
    },
    LoaderService,
    LoggedInUser,
    ClientAuthGuard,
    ClientService,
    ClientMaintenaceState//,
    //MessageHandlerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


