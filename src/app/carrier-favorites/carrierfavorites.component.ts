import { Component, OnInit } from '@angular/core';
import { LoggedInUser } from '../shared/loggedInUser/LoggedInUser';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { LoaderService } from '../shared/loaderComponent/Loader.service';
import { CarrierFavService } from './carrierfavorites.service';
import { ClientService } from '../select-client/client.service';
import { Account } from '../select-client/select-client.model';
 import {Carrier} from '../carrier-search/carriersearch.model';

@Component({
  selector: 'app-carrierfavorites',
  templateUrl: './carrierfavorites.component.html',
  styleUrls: ['./carrierfavorites.component.css'],
  providers: [CarrierFavService, LoggedInUser]
})
export class CarrierFavoritesComponent implements OnInit {
  newCategory: string;
  categoryName: string;
  carrierFavoriteToUpdate: string;
  favorite: string;
  showTable : boolean;
  categoryToUpdate : string;
  //category ; Array<Category>;
  categoryType: number;
  groupType : number;
  clientId: string;
  createdCategory: string;
  createdFavorite : string;
  isError: boolean;
  isSuccess: boolean;
  isShowSuccessModal : boolean;
  message: string;
  saveSuccess: false;
  selectedCategoryId: string;
  selectedCategory: string;
  selectedCategory1: string;
  createdCategoryId: string;
  carrierFavoriteToDelete : string;
  selectedFavoriteId : string;
  selectedFavoriteName : string;
  selectedCategoryName : string;
  categorytoDelete : string;
  favoriteName :string;
  selectedAccount: Account;
  // searchRequest: SearchRequest;
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
  selectedCarrier: Carrier;
  carrierId : string;
  groupId : string;

  constructor(private _router: Router, private _carrierFavService: CarrierFavService, private _loggedInUser: LoggedInUser,
    private _clientService: ClientService,
    private _loaderService: LoaderService) {
    this.createdCategory = '(None)'
    
  }

  ngOnInit() {
    // this.selectedCarrier = this._clientService.getCarriers()[0];
    // if(this.selectedCarrier !=undefined  || this.selectedCarrier!= null){
    // this.carrierId = this.selectedCarrier.WillisCode;}
    // else {
    //   this.carrierId = '';
    // }
    // console.log("Selected Carrier-Id:"+this.carrierId);
    
    this.selectedAccount = this._clientService.getSelectedAccount();
    if (this.selectedAccount !=undefined || this.selectedAccount!=null){
    this.clientId = this.selectedAccount.Id;
    }
    else this.clientId = '';
    console.log("ClientID:"+this.clientId);
    
    this.getCategories();
    this.getCarrierFavorites();
    this.showTable = true;
    this.isShowSuccessModal = false;
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
  saveCategory() {
    this.categoryName = this.categoryName;
    this.categoryType = 1;
    this.clientId = 'null';
    this.createdCategory = this.categoryName;
    // this.fz.PostFavoriteCategory(this.categoryName, this.categoryType, this.clientId)
    //   .subscribe((result) => {
    //  isShowSuccessModal = true;
    //     this.getCategories();
    //   })
  }
  updateCategory() {
    this.categoryToUpdate = this.selectedCategoryId;
    this.categoryType = 1;
    this.createdCategory = this.selectedCategoryName;
    // this._carrierFavService.PutFavoriteCategory(this.categoryToUpdate, this.categoryType)
    //   .subscribe((result) => {
       //  isShowSuccessModal = true;
    //     this.getCategories();
    //   })
  }
  deleteCategory() {
    this.categorytoDelete = this.selectedCategoryId;
    this.clientId = this.clientId;
    //   //this._carrierFavService.DeleteFavoriteCategory(this.categorytoDelete, this.clientId)
    //   .subscribe(()=>{
    //    // this.getCategories();
    //     this.showSuccess('Category Deleted')
    //   },(error) => this.handleError(error));
    //  
    //}
  }
  onCategoryChange(category) {
    this.selectedCategoryId = category.categoryId;
    this.selectedCategoryName = category.categoryName;
  }
  getCategories() {
    this.isSuccess = false;
    this.isError = false;
    //     this._loaderService.show();
    //     this._carrierFavService.getCategories()
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
    // this._carrierFavService.PostFavoriteGroup(this.carrierFavoriteToUpdate, this.groupType, this.clientId)
    //   .subscribe((result) => {
    //     this.getCarrierFavorites();
    //   })
  }
  updateCarrierFavorite() {
    this.carrierFavoriteToUpdate = this.selectedFavoriteId;
    this.groupType = 1;
    // this._carrierFavService.PutFavoriteGroup(this.carrierFavoriteToUpdate,this.groupType)
    //   .subscribe((result) => {
    //     this.getCarrierFavorites();
    //   })
  }

  deleteCarrierFavorite() {
    this.selectedCategory1 = this.selectedCategoryId;
    this.carrierFavoriteToDelete = this.selectedFavoriteId;
    this.clientId = this.clientId;
    //console.log("Details :"+this.carrierFavoriteToDelete,this.selectedCategory1,this.clientId);
    /*
    if (this.selectedCategory1 == undefined || this.selectedCategory1 == null) {
      this._carrierFavAdminService.DeleteFavoriteCategory(this.carrierFavoriteToDelete, this.clientId)
        .subscribe(() => {
          this.getCarrierFavorites();
          this.showSuccess('Category Deleted')
        }, (error) => this.handleError(error));
    }
    else {
      this._carrierFavAdminService.DeleteFavoriteCategoryboth(this.carrierFavoriteToDelete, this.selectedCategory1, this.clientId)
        .subscribe(() => {
          this.getCarrierFavorites();
          this.showSuccess('Category and group Deleted')
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
    //     this._carrierFavService.getGroups()
    //       .subscribe((result) => {
    //         this.favorites = result;
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
