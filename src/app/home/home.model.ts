
export class Entities {
    Id: number;
    Name: string;
    constructor(Id: number,  Name: string) {
        this.Id = Id;
        this.Name = Name;
       
    }
}

export class EntityAttributes {
    Id: number;
    Name: string;
    EntityId:number;
    constructor(Id: number,  Name: string,EntityId :number ) {
        this.Id = Id;
        this.Name = Name;
       this.EntityId = EntityId;
    } 
}

export class EntityAttributeValues {
    Value: string;
    constructor(Value: string) {
        this.Value = Value;
       
    } 
}

