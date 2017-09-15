import { UpdateFavoriteCategory, CarrierFavorite, CreateFavoriteCategory,FavoriteCategory,FavoriteType,FavoriteGroup } from './carrierfavorites.model';
export class CarrierFavHelper {
    
    static mapToCategoryInfo(category: any): FavoriteCategory {
        return new FavoriteCategory(category.CategoryName, category.ClientId, category.CategoryType);
    }
    static mapToGroupInfo(group: any): FavoriteGroup {
        return new FavoriteGroup(group.GroupName, group.ClientId, group.GroupType);
    }
    static mapToCarrierInfo(carrier: any) : CarrierFavorite{
        return new CarrierFavorite(carrier.carrierId, carrier.LegalName, carrier.WTWCode, carrier.CountryName, carrier.StateName);
    }
    
}