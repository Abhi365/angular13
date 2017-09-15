import {ReferenceCode, CreateReferenceCode} from './summary.model';

export class SummaryHelper {
    static mapToReferenceCode(reference : any) :  ReferenceCode{
       return new ReferenceCode(reference.Id, reference.MosaicClientId, reference.CarrierId, reference.Code);
    }

    // static mapToCreateReferenceCode(create : any) : CreateReferenceCode{
    //     return new CreateReferenceCode(create.Code);
    // }
}