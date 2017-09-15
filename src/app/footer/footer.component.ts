import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
logo:string
  constructor() {
    this.logo='/assets/images/wtw-logo.png';
   }

  ngOnInit() {
  }

}
