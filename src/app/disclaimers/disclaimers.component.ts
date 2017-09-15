//
import { Component, OnInit, OnChanges, AfterContentInit } from '@angular/core';
import { DisclaimersService } from './disclaimers.service';
import { RatingAgency, RatingAgencyDisclaimer, WTWDisclaimer } from './disclaimers.model';
import { LoaderService } from '../shared/loaderComponent/Loader.service';
//import $ from 'jQuery';
declare var $: any;
@Component({
  selector: 'app-disclaimers',
  templateUrl: './disclaimers.component.html',
  styleUrls: ['./disclaimers.component.css'],
  providers: [DisclaimersService]
})
export class DisclaimersComponent implements OnInit, AfterContentInit {

  text: string;
  disclaimer: string;
  IsHidden: boolean;
  result: Array<RatingAgency>;
  disclaimerResult: RatingAgencyDisclaimer;
  WTWdisclaimerResult: WTWDisclaimer;
  isError: boolean;
  isSuccess: boolean;
  isAlert: boolean;
  message: string;
  saveSuccess: false;
  RatingAgencyDisclaimer: RatingAgencyDisclaimer
  Id: number;
  RatingAgencyId: number;
  UpdatedRatingAgencyDisclaimer: RatingAgencyDisclaimer;

  constructor(private _disclaimerService: DisclaimersService, private _loaderService: LoaderService) {
    this.Id = 0;
    this.RatingAgencyId = 0;
    this.disclaimer = '';
    this.IsHidden = true;
  }

  ngOnInit() {
    // $.getScript('./assets/scripts/richTextEditor.js');
    this.richTextEditor();
  }

  ngAfterContentInit(): void {
    this.GetRatingAgencies();
    // $.getScript('./assets/scripts/richTextEditor.js');
    this.richTextEditor();
  }

  setHidden() {
    this.IsHidden = !this.IsHidden;
  }

  GetDisclaimer() {
    //$.getScript('./assets/scripts/richTextEditor.js');
    this._loaderService.show();
    this.isAlert = false;
    this.isSuccess = false;
    this.isError = false;
    this._disclaimerService.GetDisclaimer().subscribe(WTWdisclaimerResult => {
      this.WTWdisclaimerResult = WTWdisclaimerResult;
      $('#editor').html(WTWdisclaimerResult.DisclaimerText);
      this.disclaimer = WTWdisclaimerResult.DisclaimerText;
      this.IsHidden = WTWdisclaimerResult.IsHidden;
      this._loaderService.hide();
    });
  }

  GetRatingAgencies() {
    this.isAlert = false;
    this.isSuccess = false;
    this.isError = false;
    this._disclaimerService.GetRatingAgencies().subscribe(result => {
      this.result = result;
      this.GetDisclaimer();
    });
  }

  GetDisclaimerByRatingAgencyId(id: number) {
    this.isAlert = false;
    this.isSuccess = false;
    this.isError = false;
    //$.getScript('./assets/scripts/richTextEditor.js');
    if (id != 0) {
      this._disclaimerService.GetDisclaimerByRatingAgencyId(id).subscribe(disclaimerResult => {
        // console.log("Result on selecting Agency:");
        // console.log(disclaimerResult);
        if (disclaimerResult) {
          this.Id = disclaimerResult.Id;
          this.RatingAgencyId = disclaimerResult.RatingAgencyId;
          this.disclaimer = disclaimerResult.DisclaimerText;
          this.IsHidden = disclaimerResult.IsHidden;
          $('#editor').html(disclaimerResult.DisclaimerText);
          
          
        } else {
          this.Id = null;
          $('#editor').html('');
        }
      });
    }
    else {
      this.GetDisclaimer();
    }

  }

  saveData() {

    this.isAlert = false;
    this.isError = false;
    this.isSuccess = false;
    var str = $("#editor").html();
    var regex = /<br\s*[\/]?>/gi;
    var regex2 = /<div\s*[\/]?>/gi;
    $("#editor").html(str
      .replace(regex, "")
      .replace(regex2, "")
    );

    if (($('#editor').html()) == '' && this.IsHidden === false) {
      this.handleAlert();
    } else {
      if (this.RatingAgencyId !== 0) {
        this._disclaimerService.GetDisclaimerByRatingAgencyId(this.RatingAgencyId)
          .subscribe(disclaimerResult => {
            if (disclaimerResult) {
              this.updateDisclaimer();
            } else {

              this.createDisclaimer();
            }
          }
          );

      } else {
        this._disclaimerService.GetDisclaimer().subscribe(WTWdisclaimerResult => {
          if (WTWdisclaimerResult) {
            this.updateDisclaimer();
          }
          else {
            this.createDisclaimer();
          }
        });
      }
    }
  }


  createDisclaimer() {
    this.isAlert = false;
    this.isError = false;
    this.isSuccess = false;
    this.disclaimer = ($('#editor').html());
    this._disclaimerService.PostDisclaimer(this.RatingAgencyId, this.disclaimer, this.IsHidden)
      .subscribe((result) => {
        if (result) {
          this.Id = result;
          this.showSuccess('Disclaimer Created');
        }
        else
          this.showError('Disclaimer Creation failed');
      }, (error) => this.handleError(error));
  }

  updateDisclaimer() {
    this.isAlert = false;
    this.disclaimer = ($('#editor').html());
    this._disclaimerService.PutDisclaimer(this.Id, this.RatingAgencyId, this.disclaimer, this.IsHidden)
      .subscribe((result) => {
        if (result)
          this.showSuccess('Disclaimer Updated');
        else
          this.showError('Disclaimer Updation failed');


      }, (error) => this.handleError(error));

  }

  showSuccess(message: string) {
    this.message = 'Disclaimer saved successfully';
    this.isAlert = false;
    this.isError = false;
    this.isSuccess = true;
  }

  showError(message: string) {
    this.isError = true;
    this.isAlert = false;
    this.isSuccess = false;
    this.message = message;
  }
  handleError(error) {
    this.isAlert = false;
    this.isSuccess = false;
    console.log('Error Occured');
    console.log(error);
    this.showError('Some Error Occured, please report to support team along with steps to reproduce');
  }

  handleAlert() {
    this.isAlert = true;
    this.isError = false;
    this.isSuccess = false;
    this.message = 'Please enter Disclaimer text and then submit';
  }

  richTextEditor(){
    $(document).ready(function () {

  $("#htmlCode").click(function () {
    HtmlElement($("#editor"));
  });
  $("#bold").click(function () {
    document.execCommand('bold', false, null);
  });
  $("#justifyCenter").click(function () {
    document.execCommand('justifyCenter', false, null);
  });
  $("#justifyLeft").click(function () {
    document.execCommand('justifyLeft', false, null);
  });
  $("#justifyRight").click(function () {
    document.execCommand('justifyRight', false, null);
  });
  $("#insertOrderedList").click(function () {
    document.execCommand('insertOrderedList', false, null);
  });
  $("#insertUnorderedList").click(function () {
    document.execCommand('insertUnorderedList', false, null);
  });
  $("#italic").click(function () {
    document.execCommand('italic', false, null);
  });
  $("#underline").click(function () {
    document.execCommand('underline', false, null);
  });
  $("#subscript").click(function () {
    document.execCommand('subscript', false, null);
  });
  $("#superscript").click(function () {
    document.execCommand('superscript', false, null);
  });
  $("#createLink").click(function () {
    var selected = document.getSelection();
    document.execCommand('createLink', false, 'http://'+selected);
  });
//  $("#createLink").click(function () {
//     var sText = document.getSelection();
//     document.execCommand('createLink', false, '<a href="' + sText + '" target="_blank">' + sText + '</a>');
// });

  function HtmlElement(elem) {
    InsertHtml($(elem).html());
  }

  function InsertHtml(data) {
    var mywindow = window.open();
    mywindow.document.write('<html><head><title>Code</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write(data.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    mywindow.document.write('</body></html>');
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10
    //mywindow.close();
    return true;
  }
});
  }
}



