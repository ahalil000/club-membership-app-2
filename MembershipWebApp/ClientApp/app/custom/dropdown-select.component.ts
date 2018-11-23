//import { Component, OnInit } from '@angular/core';
import { Component, OnInit, Input, Output, EventEmitter, HostListener, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { ValueAccessorBase } from './value-accessor';

@Component({
    selector: 'dropdown-custom',
    templateUrl: "./dropdown-select.component.html",
    styleUrls: ['./dropdown-select.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: DropdownActiveStatus,
        multi: true
    }]
})
export class DropdownActiveStatus extends ValueAccessorBase<string> implements OnInit {

    @Input() options: Array<string>;
    statuses: string[] = ["Active", "InActive"];
    selectedValue: string = '-- select value --';

    ngOnInit() {
    }

    // selectValue method on dropdown control
    selectValue(selValue: string) {
        this.selectedValue = selValue;
        this.value = selValue;
        //alert("ddl value init = " + selValue);
    }
}
