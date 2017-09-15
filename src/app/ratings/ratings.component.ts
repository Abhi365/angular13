import { Component, OnInit } from '@angular/core';
import { RatingAgencyScaleSummaryService } from './ratings.service';
import { RatingAgencyScaleSummary } from './ratings.model';
import { ratingAgencyScaleSummaryResult } from './ratings.mock.data';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css'],
  providers: [RatingAgencyScaleSummaryService]
})

export class RatingsComponent implements OnInit {
  ratingAgencyScaleSummaryList: Array<RatingAgencyScaleSummary>;
  isError: boolean;
  isSuccess: boolean;
  message: string;

  constructor(private _ratingAgencyScaleSummaryService: RatingAgencyScaleSummaryService) {
  }

  ngOnInit() {
    this.getRatingAgencyScaleSummary();
  }

  getRatingAgencyScaleSummary() {
    this._ratingAgencyScaleSummaryService
      .getRatingAgencyScaleSummary().
      subscribe((result) => {
        this.ratingAgencyScaleSummaryList = result;
      }, (error) => this.handleError(error));
  }

  showError(message: string) {
    this.isSuccess = false;
    this.isError = true;
    this.message = message;

  }

  handleError(error) {
    this.isSuccess = false;
    this.isError = true;
    this.showError('Some Error Occured, please report to support team along with steps to reproduce');
  }
}
