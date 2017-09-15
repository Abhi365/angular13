import { Component, OnInit, Input, Output, ElementRef, EventEmitter } from '@angular/core';
//import { WindowRefService } from '../../services/windowref/window-ref.service';

import * as moment from 'moment/moment';

@Component({
    selector: 'datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss'],
    host: {
        '(document:click)': 'hideDatepicker($event)'
    }
})
export class DatepickerComponent implements OnInit {
    @Input() label: string;
    @Input() isRequired: boolean;
    @Input() datepickerId: string;
    @Input() name: string;
    @Input() selectedDate:string;
    @Output() dateChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() dateFormatValidation: EventEmitter<boolean> = new EventEmitter<boolean>();

    datepicker: any;
    isDatepickerActive: boolean;
    selectedObj: any;
    startWeek: any;
    start: any;
    end: any;
    diff: number;
    current: any;
    currentMonth: string;
    currentYear: string;
    calendarHeaders: any;
    calendarRows: any;
    //selectedDate: string;
    locale: any;
    isDateValid: boolean;
    labelPolicy: any;

    constructor(
        el: ElementRef
        //,
        ///private windowRef: WindowRefService,
    ) {
        // this.locale = windowRef.nativeWindow.configSettings.user.locale;
        // this.labelPolicy = windowRef.nativeWindow.labelTranslation.policy;
        // moment.locale(this.locale);
        this.datepicker = el.nativeElement;
        this.isDatepickerActive = false;
        this.isRequired = false;
        this.selectedDate = '12/09/2017';
        this.selectedObj = {};
        this.current = moment();
        this.isDateValid = true;
        this.currentMonth = this.current.format('MMM');
        this.currentYear = this.current.format('YYYY');

        this.startWeek = moment().startOf('month').startOf('week');
        this.start = moment().startOf('month').startOf('week');
        this.end = moment().endOf('month').endOf('week');
        this.diff = this.end.diff(this.start, 'weeks');
    }

    ngOnInit() {
        this.calendarHeaders = this.getCalendarHeaders();
        this.calendarRows = this.getCalendarRows();
    }

    getCalendarRows() {
        let rows = [];
        let currentRow = [];
        let rowIterator = 7;

        for (let i = 0; i <= this.diff; i++) {
            currentRow = [];
            rowIterator = 7;

            while (rowIterator--) {
                currentRow.push({
                    year: this.start.format('YYYY'),
                    monthLabel: this.start.format('MMM'),
                    month: this.start.format('MM'),
                    monthIndex: this.start.month(),
                    day: this.start.format('DD'),
                    date: this.start.format('D'),
                    dateString: this.start.format('DD/MM/YYYY') // day-month-year
                });

                this.start.add(1, 'day');
            }

            rows.push(currentRow);
        }

        return rows;
    }

    getCalendarHeaders() {
        let headers = [];

        for (let i = 0; i < 7; i++) {
            headers.push({
                day: this.startWeek.format('ddd')
            });

            this.startWeek.add(1, 'day');
        }

        return headers;
    }

    updateCalendar(): void {
        this.calendarRows = this.getCalendarRows();
    }

    nextMonth(): void {
        this.current.add(1, 'month');

        this.resetCalendar();
        this.updateCalendar();
    }

    previousMonth(): void {
        this.current.subtract(1, 'month');

        this.resetCalendar();
        this.updateCalendar();
    }

    resetCalendar() {
        this.currentMonth = this.current.format('MMM');
        this.currentYear = this.current.format('YYYY');

        this.start.set({
            year: this.current.year(),
            month: this.current.month()
        });
        this.end.set({
            year: this.current.year(),
            month: this.current.month()
        });
        this.start = this.start.startOf('month').startOf('week');
        this.end = this.end.endOf('month').endOf('week');
        this.diff = this.end.diff(this.start, 'weeks');
    }

    selectDate(obj, $event): void {
        this.selectedObj = obj;
        this.selectedDate = `${obj.day}/${obj.month}/${obj.year}`; // obj.day-obj.monthLabel-obj.year
        this.dateChange.emit(this.selectedDate);
       
        this.isDateValid = moment(this.selectedDate, 'DD/MM/YYYY', this.locale, true).isValid()
        this.dateFormatValidation.emit(this.isDateValid);
       
        // the true parameter tells the method to set this.isDatepickerActive to false
        // and override the document:click event set by the host
        this.hideDatepicker($event, true);
    }

    showDatepicker() {
        this.isDatepickerActive = true;

        // show correct month if there is already a date value
        if (this.selectedDate !== '') {
            this.current.set({
                year: this.selectedObj.year,
                month: this.selectedObj.monthIndex
            });
            this.resetCalendar();
            this.updateCalendar();
        }
    }

    hideDatepicker($event, bool) {
        if (bool === true) {
            this.isDatepickerActive = false;
            return;
        }

        // close datepicker if clicked anywhere in the document except for the datepicker and its children
        if (!this.datepicker.contains($event.target)) {
            this.isDatepickerActive = false;
        }
    }

    validateDate($event, value) {
        this.isDateValid = moment(value, 'DD/MM/YYYY', this.locale, true).isValid();
        //console.log('Validate Date', value, this.isDateValid, this.locale);
        if (value == '') {
            this.isDateValid = true;
        }

        this.dateFormatValidation.emit(this.isDateValid);
    }

}
