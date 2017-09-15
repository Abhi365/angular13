
export class TermsOfUse {
    Id: number;
    Version: number;
    TermsOfUseText: string;
    PublishedBy: string;
    PublishedOn: string;
    CreatedBy : string;
    CreatedOn : string;
    UpdatedBy: string;
    UpdatedOn: string;

    constructor(Id: number, Version: number, TermsOfUseText: string, PublishedBy : string, PublishedOn : string,
        CreatedBy : string,CreatedOn :string,UpdatedBy : string,UpdatedOn :string) {
        this.Id = Id;
        this.Version = Version;
        this.TermsOfUseText = TermsOfUseText;
        this.PublishedBy = PublishedBy;
        this.PublishedOn = PublishedOn;
        this.CreatedBy = CreatedBy;
        this.CreatedOn = CreatedOn;
        this.UpdatedBy = UpdatedBy;
        this.UpdatedOn = UpdatedOn;
    }
}

