
export class RatingAgency {
    RatingAgencyId: number;
    RatingAgencyName: string;

    constructor(RatingAgencyId: number, RatingAgencyName: string) {
        this.RatingAgencyId = RatingAgencyId;
        this.RatingAgencyName = RatingAgencyName;
    }

    getRatingAgencyId(): number {
        return this.RatingAgencyId;
    }

    setRatingAgencyId(RatingAgencyId: number) {
        this.RatingAgencyId = RatingAgencyId;
    }

    getRatingAgencyName(): string {
        return this.RatingAgencyName;
    }

    setRatingAgencyName(RatingAgencyName: string) {
        this.RatingAgencyName = RatingAgencyName;
    }
}



export class RatingAgencyDisclaimer {
    Id: number;
    RatingAgencyId: number;
    DisclaimerText: string;
    IsHidden: boolean;

    constructor(Id: number, RatingAgencyId: number, DisclaimerText: string, IsHidden: boolean) {
        this.Id = Id;
        this.RatingAgencyId = RatingAgencyId;
        this.DisclaimerText = DisclaimerText;
        this.IsHidden = IsHidden;
    }

    getId(): number {
        return this.Id;
    }

    setId(Id: number) {
        this.Id = Id;
    }

    getRatingAgencyId(): number {
        return this.RatingAgencyId;
    }

    setRatingAgencyId(RatingAgencyId: number) {
        this.RatingAgencyId = RatingAgencyId;
    }

    getDisclaimerText(): string {
        return this.DisclaimerText;
    }

    setDisclaimerText(DisclaimerText: string) {
        this.DisclaimerText = DisclaimerText;
    }

    getIsHidden(): boolean {
        return this.IsHidden;
    }

    setIsHidden(IsHidden: boolean) {
        this.IsHidden = IsHidden;
    }
}

export class WTWDisclaimer {
    Id: string;
    DisclaimerText: string;
    IsHidden: boolean;

    constructor(Id: string, DisclaimerText: string, IsHidden: boolean) {
        this.Id = Id;
        this.DisclaimerText = DisclaimerText;
        this.IsHidden = IsHidden;
    }

    getId(): string {
        return this.Id;
    }

    setId(Id: string) {
        this.Id = Id;
    }

    getDisclaimerText(): string {
        return this.DisclaimerText;
    }

    setDisclaimerText(DisclaimerText: string) {
        this.DisclaimerText = DisclaimerText;
    }

    getIsHidden(): boolean {
        return this.IsHidden;
    }

    setIsHidden(IsHidden: boolean) {
        this.IsHidden = IsHidden;
    }

}