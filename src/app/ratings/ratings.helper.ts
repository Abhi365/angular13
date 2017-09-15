//will help in common utility static functions 
import { RatingAgencyScaleSummary } from './ratings.model';
export class RatingAgencyScaleSummaryHelper {

    static mapToRatingAgencyScaleSummary(ratingAgencyScaleSummary: any): RatingAgencyScaleSummary {
        return new RatingAgencyScaleSummary(ratingAgencyScaleSummary.AMBest,ratingAgencyScaleSummary.SP,ratingAgencyScaleSummary.Moody,ratingAgencyScaleSummary.Fitch);
    }
}