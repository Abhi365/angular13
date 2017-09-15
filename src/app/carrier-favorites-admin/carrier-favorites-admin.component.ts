import { Component, OnInit } from '@angular/core';
import { LoggedInUser } from '../shared/loggedInUser/LoggedInUser';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { LoaderService } from '../shared/loaderComponent/Loader.service';
import { CarrierFavAdminService } from './carrier-favorites-admin.service';
import { ClientService } from '../select-client/client.service';

@Component({
  selector: 'app-carrier-favorites-admin',
  templateUrl: './carrier-favorites-admin.component.html',
  styleUrls: ['./carrier-favorites-admin.component.css'],
  providers: [CarrierFavAdminService, LoggedInUser]
})
export class CarrierFavoritesAdminComponent implements OnInit {
  newCategory: string;
  categoryName: string;
  carrierFavoriteToUpdate: string;
  favorite: string;
  showTable: boolean;
  groupId : string;
  categoryToUpdate: string;
  //category ; Array<Category>;
  categoryType: number;
  groupType: number;
  clientId: string;
  createdCategory: string;
  createdFavorite: string;
  isError: boolean;
  isSuccess: boolean;
  isShowSuccessModal: boolean;
  message: string;
  saveSuccess: false;
  selectedCategoryId: string;
  selectedCategory: string;
  selectedCategory1: string;
  createdCategoryId: string;
  carrierFavoriteToDelete: string;
  selectedFavoriteId: string;
  selectedFavoriteName: string;
  selectedCategoryName: string;
  categorytoDelete: string;
  favoriteName: string;

  categories = [
    { categoryId: 1, categoryName: 'Mix' },
    { categoryId: 2, categoryName: 'Ian' },
    { categoryId: 3, categoryName: 'Aniel' },
    { categoryId: 4, categoryName: 'Jess' },
    { categoryId: 5, categoryName: 'Jusi' },
  ];
  favorites = [
    { favoriteId: 1, favoriteName: 'Fav1' },
    { favoriteId: 2, favoriteName: 'Fav2' },
    { favoriteId: 3, favoriteName: 'Fav3' },
    { favoriteId: 4, favoriteName: 'Fav4' },
    { favoriteId: 5, categoryName: 'Fav5' },
  ];
  carriers = [
    {carrierId : 1, legalName: '0099', WTWCode:'W23', countryName:'United Kingdom', stateName:''},
    {carrierId : 2, legalName: '0259', WTWCode:'W563', countryName:'United States', stateName:''}
  ];

  constructor(private _router: Router, private _carrierFavAdminService: CarrierFavAdminService, private _loggedInUser: LoggedInUser,
    private _clientService: ClientService,
    private _loaderService: LoaderService) {
    this.createdCategory = '(None)'
  }

  ngOnInit() {
    this.getCategories();
    this.getCarrierFavorites();
    this.getCarrierFavoritesByGroupId();
    this.showTable = true;
    this.isShowSuccessModal = false;
  }

  saveCategory() {
    this.categoryName = this.categoryName;
    this.categoryType = 1;
    this.clientId = 'null';
    this.createdCategory = this.categoryName;
    // this._carrierFavAdminService.PostFavoriteCategory(this.categoryName, this.categoryType, this.clientId)
    //   .subscribe((result) => {
    //  isShowSuccessModal = true;
    //     this.getCategories();
    //   })
  }
  updateCategory() {
    this.categoryToUpdate = this.selectedCategoryId;
    this.categoryType = 1;
    this.createdCategory = this.selectedCategoryName;
    // this._carrierFavAdminService.PutFavoriteCategory(this.categoryToUpdate, this.categoryType)
    //   .subscribe((result) => {
    //  isShowSuccessModal = true;
    //     this.getCategories();
    //   })
  }
  deleteCategory() {
    this.categorytoDelete = this.selectedCategoryId;
    //   //this._carrierFavAdminService.DeleteFavoriteCategory(this.categorytoDelete)
    //   .subscribe(()=>{
    //    // this.getCategories();
    //     this.showSuccess('Category Deleted')
    //   },(error) => this.handleError(error));
    //   }
  }
  onCategoryChange(category) {
    this.selectedCategoryId = category.categoryId;
    this.selectedCategoryName = category.categoryName;
  }
  getCategories() {
    this.isSuccess = false;
    this.isError = false;
    //     this._loaderService.show();
    //     this._carrierFavAdminService.getCategories()
    //       .subscribe((result) => {
    //         this.categories = result;
    //         this._loaderService.hide();
    //       },
    //       (error) => this.handleError(error));
  }

  saveCarrierFavorite() {
    this.carrierFavoriteToUpdate = this.favoriteName;
    this.groupType = 1;
    this.clientId = 'null';
    this.createdFavorite = this.carrierFavoriteToUpdate;
    // this._carrierFavAdminService.PostFavoriteGroup(this.carrierFavoriteToUpdate, this.groupType, this.clientId)
    //   .subscribe((result) => {
    //     this.getCarrierFavorites();
    //   })
  }
  updateCarrierFavorite() {
    this.carrierFavoriteToUpdate = this.selectedFavoriteId;
    this.groupType = 1;
    // this._carrierFavAdminService.PutFavoriteGroup(this.carrierFavoriteToUpdate,this.groupType)
    //   .subscribe((result) => {
    //     this.getCarrierFavorites();
    //   })
  }
  deleteCarrierFavorite() {
    this.selectedCategory1 = this.selectedCategoryId;
    this.carrierFavoriteToDelete = this.selectedFavoriteId;
    /*
    if (this.selectedCategory1 == '') {
      this._carrierFavAdminService.DeleteFavoriteCategory(this.carrierFavoriteToDelete)
        .subscribe(() => {
          this.getCarrierFavorites();
          this.showSuccess('Category Deleted')
        }, (error) => this.handleError(error));
    }
    else {
      this._carrierFavAdminService.DeleteFavoriteCategoryboth(this.carrierFavoriteToDelete, this.selectedCategory1)
        .subscribe(() => {
          this.getCarrierFavorites();
          this.showSuccess('Category Deleted')
        }, (error) => this.handleError(error));
    }
    */
  }

  onCarrierFavoriteChange(favorite) {
    this.selectedFavoriteId = favorite.favoriteId;
    this.selectedFavoriteName = favorite.favoriteName;
  }

  getCarrierFavorites() {
    this.isSuccess = false;
    this.isError = false;
    //     this._carrierFavAdminService.getGroups()
    //       .subscribe((result) => {
    //         this.favorites = result;
    //       },
    //       (error) => this.handleError(error));
  }

  getCarrierFavoritesByGroupId(){
    this.groupId = this.selectedFavoriteId;
    this.isSuccess = false;
    this.isError = false;
    //     this._carrierFavAdminService.GetCarrierFavoritesByGroupId(this.groupId)
    //       .subscribe((result) => {
    //         this.carriers = result;
    //       },
    //       (error) => this.handleError(error));

  }
  showSuccess(message: string) {
    this.isSuccess = true;
    this.isError = false;
    console.log('Success');
  }

  showError(message: string) {
    this.isSuccess = false;
    this.isError = true;
    this.message = message;
    console.log('Error');
  }

  handleError(error) {
    this.isSuccess = false;
    this.isError = true;
    this.showError('Some Error Occured, please report to support team along with steps to reproduce');
  }
}
