import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../select-client/client.service';
import {
  ApprovalStatus, BusinessUnit, CompanyType, Country, LegalEntity, LicenceType,
  OperatingCategory, Ownership, Qualifier, Restriction, State, Carrier, SearchRequest, RatingAgency,
  RatingAgencyScale
} from '.././carriersearch.model'

@Component({
  selector: 'app-link-component',
  templateUrl: './link-component.component.html',
  styleUrls: ['./link-component.component.css']
})
export class LinkComponent implements OnInit {

  private params: any;
  value: string;

  agInit(params: any): void {
    this.params = params;

  }
  constructor(private _router: Router, private _clientService: ClientService) { }

  ngOnInit() {
    this.value = this.params.value;
  }


  navigatetodetail() {
    let carriers: Array<Carrier> = new Array<Carrier>();
    carriers.push(this.params.data);
    this._clientService.setCarriers(carriers);
    this._router.navigateByUrl('/carrier-detail');
    if (this.params.data.Country == 'United States'|| this.params.data.Country == 'Canada')
      this._router.navigate(['carrier-detail', 0]);
    else
      this._router.navigate(['carrier-detail', 1]);
  }

}
