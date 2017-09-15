import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../select-client/client.service';
import { UserRole } from '../../shared/model/model';
import { LoggedInUser } from '../../shared/loggedInUser/LoggedInUser';
@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  private params: any;
  value: string;
  isClientReader: boolean;

  agInit(params: any): void {
    this.params = params;

  }
  constructor(private _clientService: ClientService, private _loggedInUser: LoggedInUser) { }

  ngOnInit() {
    this.value = this.params.value;
    this.checkIfClientReader();
  }


  checkIfClientReader() {
    this.isClientReader = (this._loggedInUser.getRole().getRank() === UserRole.ClientReader);
  }

}
