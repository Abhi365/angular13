import { Inject, Directive, ElementRef, Output, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { NgModel } from '@angular/forms';

declare var $: any;
/*
export class NiceSelect {

    constructor( @Inject(DOCUMENT) private document: any) {
    }

    public static niceSelect(...selector: string[]) {
        $(document).ready(function () {
            if (selector[0] === undefined)
                $('.nice-small').niceSelect();
            else
                $(selector[0]).niceSelect();
        });
    }
}*/

@Directive({
    selector: '[appNiceSelect]',
    providers: [NgModel],
})
export class NiceSelectDirective {
    @Output() ngModelChange = new EventEmitter();
    constructor( @Inject(DOCUMENT) private document: any, private el: ElementRef) {
        const _this = this;

        $(document).ready(function () {
            $(el.nativeElement).niceSelect();
            _this.registerChangeEvent();
        });
    }

    registerChangeEvent() {
        const _this = this;
         const _list = $(_this.el.nativeElement).next().children('ul');
        $(_this.el.nativeElement).change(function () {
             _this.ngModelChange.emit(_list.children('li.selected').attr('data-value'));
        });
    }

}
