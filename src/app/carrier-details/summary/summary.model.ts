export class ReferenceCode {
    Id: number;
    MosaicClientId: string;
    CarrierId: number;
    Code: string;

    constructor(Id: number, MosaicClientId: string, CarrierId: number, Code: string) {
        this.Id = Id;
        this.MosaicClientId = MosaicClientId;
        this.CarrierId = CarrierId;
        this.Code = Code;
    }

    getId(): number {
        return this.Id;
    }
    setId(Id: number) {
        this.Id = Id;
    }
    getMosaicClientId(): string {
        return this.MosaicClientId;
    }
    setMosaicClientId(MosaicClientId: string) {
        this.MosaicClientId = MosaicClientId;
    }
    getCarrierId(): number {
        return this.CarrierId
    }
    setCarrierId(CarrierId: number) {
        this.CarrierId = CarrierId;
    }
    getCode(): string {
        return this.Code;
    }
    setCode(Code: string) {
        this.Code = Code;
    }
}

export class CreateReferenceCode {
    Code: string;

    constructor(Code: string) {
        this.Code = Code;
    }
    getCode(): string {
        return this.Code;
    }
    setCode(Code: string) {
        this.Code = Code;
    }
}