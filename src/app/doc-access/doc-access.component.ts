import { Component, OnInit } from '@angular/core';
//import $ from 'jquery';

@Component({
  selector: 'app-doc-access',
  templateUrl: './doc-access.component.html',
  styleUrls: ['./doc-access.component.css']
})
export class DocAccessComponent implements OnInit {
  firstview=true;
  secondview=false;
  thirdview=false;
  constructor() { }

  ngOnInit() {
    //$.getScript('./assets/scripts/init.js');
  }

  shuffleview(data) {
   // $.getScript('./assets/scripts/init.js');
    if(data=='1') {
      this.firstview=true;
      this.secondview=false;
  this.thirdview=false;
    }

    if(data=='2') {
      
      this.firstview=false;
      this.secondview=true;
  this.thirdview=false;
    }

    if(data=='3') {
      this.firstview=false;
      this.secondview=false;
  this.thirdview=true;
    }
  }

}
