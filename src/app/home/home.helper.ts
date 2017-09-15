import {Entities,EntityAttributes,EntityAttributeValues} from './home.model';
export class HomePageHelper {

    static mapToEntity(entity: any): Entities {
        return new Entities(entity.Id, entity.Name);
    }
    
    static mapToEntityAttribute(entityAttribute: any): EntityAttributes {
        return new EntityAttributes(entityAttribute.Id, entityAttribute.Name, entityAttribute.EntityId);
    }
    
      static mapToEntityAttributeValue(entityAttributeValues: string): EntityAttributeValues {
        return new EntityAttributeValues(entityAttributeValues);
    }
}