//will help in common utility static functions 
import {TermsOfUse} from './terms-of-use.model';
export class TermsOfUseHelper {

    static mapToTermsOfUse(termsOfUse: any): TermsOfUse {
        //return Announcements Object
        return new TermsOfUse(termsOfUse.Id, termsOfUse.Version, termsOfUse.TermsOfUseText,
            termsOfUse.PublishedBy, termsOfUse.PublishedOn, termsOfUse.CreatedBy, termsOfUse.CreatedOn, termsOfUse.UpdatedBy, termsOfUse.UpdatedOn);
    }
    
      
}