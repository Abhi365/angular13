import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LoaderService {
    showLoader: EventEmitter<boolean>;
    // private message: string;
    constructor(){
        this.showLoader=new EventEmitter<boolean>();
    }

    // public show(message: string) {
    public show() {
        //this.message = message;
        this.showLoader.emit(true);
    }

    public hide() {
        this.showLoader.emit(false);
    }
}
