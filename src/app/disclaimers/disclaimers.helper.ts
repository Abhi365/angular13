//will help in common utility static functions 
import { RatingAgency, RatingAgencyDisclaimer, WTWDisclaimer } from './disclaimers.model';
export class DisclaimersHelper {

    static mapToAgencyInfo(agency: any): RatingAgency {
        //return Agency Object
        return new RatingAgency(agency.RatingAgencyId, agency.RatingAgencyName);
    }

    static mapToDisclaimerInfo(disclaimer: any): RatingAgencyDisclaimer {
        //return Agency Object
        return new RatingAgencyDisclaimer(disclaimer.Id, disclaimer.RatingAgencyId, disclaimer.DisclaimerText, disclaimer.IsHidden);
    }

    static mapToWTWDisclaimer(wtwdisclaimer) {
        return new WTWDisclaimer(wtwdisclaimer.Id, wtwdisclaimer.DisclaimerText, wtwdisclaimer.IsHidden);
    }

}