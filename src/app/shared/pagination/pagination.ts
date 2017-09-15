import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import * as _ from "lodash";

@Component({
    selector: 'app-pagination-comp',
    templateUrl: './pagination.html',
    styleUrls: ['./pagination.css']
})
export class PaginationComp implements OnChanges {


    @Input('dataSet') dataSet: Array<any>;
    @Input('pageSize') pageSize: number;
    @Output('getPageResult') getPageResult: EventEmitter<any>;
    pageResult: Array<any>;
    paginationLength: Array<number>;
    currentpageIndex: number;

    constructor() {
        this.getPageResult = new EventEmitter<any>();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.paginationLength = new Array<number>();
        this.setPaginationlength();
        this.setPageResults(0);
    }

    setPaginationlength() {
        for (let index = 0; index < (this.dataSet.length / this.pageSize); index++) {
            this.paginationLength.push(index);
        }
    }

    setPageResults(pageIndex: number) {
        if (this.dataSet !== undefined && this.dataSet.length !== 0 && pageIndex>=0  && pageIndex<this.paginationLength.length) {
            this.currentpageIndex = pageIndex;
            let clients = _.cloneDeep(this.dataSet);
            this.pageResult = clients.splice((this.currentpageIndex * this.pageSize), this.pageSize);
            this.getPageResult.emit(this.pageResult);
        }
    }
}