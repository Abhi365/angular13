import { Router, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RatingsComponent } from './ratings/ratings.component';
import { DisclaimersComponent } from './disclaimers/disclaimers.component';
import { EdituserComponent } from './edit-user/edituser.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { CarriersearchComponent } from './carrier-search/carriersearch.component';
import { NotificationComponent } from './notification/notification.component';
import { CarrierDocComponent } from './carrier-doc/carrier-doc.component';
import { HomePageAdminComponent } from './home-page-admin/home-page-admin.component';
import { CarrierFavoritesComponent } from './carrier-favorites/carrierfavorites.component';
import { CarrierFavoritesAdminComponent } from './carrier-favorites-admin/carrier-favorites-admin.component';
import { ClientMaintenanceComponent } from './client-maintenance/clientmaintenance.component';
import { DocAccessComponent } from './doc-access/doc-access.component';
import { DocFolderComponent } from './doc-folder/doc-folder.component';
import { ReportsComponent } from './reports/reports.component';
import { MsHomeComponent } from './ms-home/ms-home.component';
import { SelectClient } from './select-client/select-client.component';
import { ClientAuthGuard } from './app.client.auth.guard';

import { CarrierDetailsComponent } from './carrier-details/carrier-details.component';
import { GeneralComponent } from './carrier-details/general/general.component';
import { SummaryComponent } from './carrier-details/summary/summary.component';
import { FinancialsComponent } from './carrier-details/financials/financials.component';
import { LicensesComponent } from './carrier-details/licenses/licenses.component';
import { DocumentsComponent } from './carrier-details/documents/documents.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';


export const routing = RouterModule.forRoot([
    { path: 'home', component: HomeComponent, canActivate: [ClientAuthGuard] },
    { path: 'disclaimers', component: DisclaimersComponent },
    { path: 'ratings', component: RatingsComponent },
    { path: 'edit-user', component: EdituserComponent },
    { path: 'announcements', component: AnnouncementsComponent },
    { path: 'carrier-search', component: CarriersearchComponent, canActivate: [ClientAuthGuard] },
    { path: 'notification', component: NotificationComponent, canActivate: [ClientAuthGuard] },
    { path: 'carrier-doc', component: CarrierDocComponent, canActivate: [ClientAuthGuard] },
    { path: 'home-page-admin', component: HomePageAdminComponent },
    { path: 'carrier-favorites', component: CarrierFavoritesComponent },
    { path : 'carrier-favorites-admin', component :CarrierFavoritesAdminComponent},
    { path: 'client-maintenance', component: ClientMaintenanceComponent },
    { path: 'doc-access', component: DocAccessComponent },
    {
        path: 'carrier-detail/:id', component: CarrierDetailsComponent, children: [
            { path: 'general', component: GeneralComponent },
            { path: 'summary', component: SummaryComponent },
            { path: 'financials', component: FinancialsComponent },
            { path: 'documents', component: DocumentsComponent },
            { path: 'licenses', component: LicensesComponent },
            { path: '**', redirectTo: '\general' },
            /* { path: 'general', component: GeneralComponent, outlet: 'carrierdetail' },
             { path: 'summary', component: SummaryComponent, outlet: 'carrierdetail' },
             { path: 'financials', component: FinancialsComponent, outlet: 'carrierdetail' },
             { path: 'documents', component: DocumentsComponent, outlet: 'carrierdetail' },
             { path: 'licenses', component: LicensesComponent, outlet: 'carrierdetail' }*/
        ]
    },
    { path: 'doc-folder', component: DocFolderComponent },
    { path: 'admin-reports', component: ReportsComponent },
    { path: 'admin-reports/:reportName', component: ReportsComponent },
    { path: 'msHome', component: MsHomeComponent },
    { path: 'select-client', component: SelectClient },
    { path: 'terms-of-use', component: TermsOfUseComponent },
    { path: '**', redirectTo: '\home' },
]);
