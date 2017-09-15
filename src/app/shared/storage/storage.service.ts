import { Injectable } from '@angular/core';

@Injectable()
export class Storage {

  private _keyVault: object;

  constructor() {
    this._keyVault = {};
  }

  getItem(key: string) {
    return this._keyVault[key];
  }

  setItem(key: string, value: string) {
    this._keyVault[key] = value;
  }
}