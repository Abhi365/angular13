import { Component } from '@angular/core';

import { LoaderService } from './Loader.service';

@Component({
    selector: 'app-loader-comp',
    templateUrl:'./loader.component.html',
    styles:['./loader.component.css']
})
export class LoaderComponent {

    constructor(private loaderService: LoaderService) {

    }

}
