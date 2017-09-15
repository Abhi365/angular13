import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

import { Carrier } from '../carrier-search/carriersearch.model';
import { ClientService } from '../select-client/client.service';
import { CarrierDetailsService } from './carrier-details.service';

@Component({
  selector: 'app-carrier-details',
  templateUrl: './carrier-details.component.html',
  styleUrls: ['./carrier-details.component.css'],
  providers: [CarrierDetailsService]
})
export class CarrierDetailsComponent implements OnInit,OnDestroy {

  selectedCarrier: Carrier;
  id;
  sub;
  country;
  //reportUrl: string;

  constructor(private _router: Router, private _route: ActivatedRoute, private _clientService: ClientService,
    private _carrierDetailsService: CarrierDetailsService) {
    if (this._clientService.getCarriers() == undefined) {
      this._router.navigateByUrl('/carrier-search');
    }
  }

  ngOnInit() {
    // get first carrier
    this.selectedCarrier = this._clientService.getCarriers()[0];
    /* this.reportUrl = this._settings.getReportsUrl() + 'reports/' +
       this.selectedCarrier.CompanyType + '/params/CurrentYear=' +
       new Date().getFullYear() + '|CompanyCode=' + this.selectedCarrier.CompanyType + '|ReportType=';
     console.log(this.reportUrl);*/
    this.sub = this._route.params.subscribe(params => {
      this.id = +params['id'];
    })
    this.verify(this.id);
  }



  navigate(dest: string) {
    // this._router.navigate(['/carrier-detail', { outlets: { 'carrierdetail': [dest] } }]);
    //this._router.navigateByUrl('/carrier-detail/' + dest);
    this._router.navigate([dest], { relativeTo: this._route })
    // , { relativeTo: this.route }
    //this._router.navigate(['/carrier-detail', { outlets: { 'carrierdetail': null } }]);
  }

  ngOnDestroy(){
  }

  verify(country: number) {
    this.country=country;
  }

}
