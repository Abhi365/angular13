import { Component, OnInit, AfterContentInit } from '@angular/core';
import { HomePageService } from './home.service';
import { Entities, EntityAttributes, EntityAttributeValues } from './home.model';
import { FormsModule } from '@angular/forms';
import 'rxjs/add/observable/fromEvent';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomePageService]
})
export class HomeComponent implements OnInit, AfterContentInit {
   entityname :string;
   homepageadminText:string;
   isError: boolean;
  isSuccess: boolean;
  message: string;

  constructor(private _homePageService: HomePageService) {
    this.entityname = "HomePageAdmin";


  }

  ngOnInit() {
    $.getScript('./assets/scripts/richTextEditor.js');
  }


   ngAfterContentInit() {
    this.functionToDisplayHomepageadminText();
    


  }



  functionToDisplayHomepageadminText() {
    
    this._homePageService
      .gethomepageadminText().
      subscribe((result) => {
       // console.log(result.Value["_body"]);
        $('#editor').html(result.Value["_body"]);
        
      }, (error) => this.handleError(error));
  }




  handleError(error) {
    this.isSuccess = false;
    this.isError = true;
    console.log('Error Occured');
    console.log(error);
    this.showError('Some Error Occured, please report to support team along with steps to reproduce');
  }
 showError(message: string) {
    this.isSuccess = false;
    this.isError = true;
    this.message = message;

  }

}
