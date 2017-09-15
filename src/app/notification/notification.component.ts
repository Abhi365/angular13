import { Component, OnInit } from '@angular/core';
//import $ from 'jquery';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('carrier');
   // $.getScript('./assets/scripts/init.js');
  }


}
