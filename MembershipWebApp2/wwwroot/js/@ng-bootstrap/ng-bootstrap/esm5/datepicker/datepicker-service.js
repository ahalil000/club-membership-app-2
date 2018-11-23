/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgbCalendar } from './ngb-calendar';
import { NgbDate } from './ngb-date';
import { Injectable } from '@angular/core';
import { isInteger, toInteger } from '../util/util';
import { Subject } from 'rxjs';
import { buildMonths, checkDateInRange, checkMinBeforeMax, isChangedDate, isDateSelectable, generateSelectBoxYears, generateSelectBoxMonths, prevMonthDisabled, nextMonthDisabled } from './datepicker-tools';
import { filter } from 'rxjs/operators';
import { NgbDatepickerI18n } from './datepicker-i18n';
var NgbDatepickerService = /** @class */ (function () {
    function NgbDatepickerService(_calendar, _i18n) {
        this._calendar = _calendar;
        this._i18n = _i18n;
        this._model$ = new Subject();
        this._select$ = new Subject();
        this._state = {
            disabled: false,
            displayMonths: 1,
            firstDayOfWeek: 1,
            focusVisible: false,
            months: [],
            navigation: 'select',
            outsideDays: 'visible',
            prevDisabled: false,
            nextDisabled: false,
            selectBoxes: { years: [], months: [] },
            selectedDate: null
        };
    }
    Object.defineProperty(NgbDatepickerService.prototype, "model$", {
        get: /**
         * @return {?}
         */
        function () { return this._model$.pipe(filter(function (model) { return model.months.length > 0; })); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "select$", {
        get: /**
         * @return {?}
         */
        function () { return this._select$.pipe(filter(function (date) { return date !== null; })); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "dayTemplateData", {
        set: /**
         * @param {?} dayTemplateData
         * @return {?}
         */
        function (dayTemplateData) {
            if (this._state.dayTemplateData !== dayTemplateData) {
                this._nextState({ dayTemplateData: dayTemplateData });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "disabled", {
        set: /**
         * @param {?} disabled
         * @return {?}
         */
        function (disabled) {
            if (this._state.disabled !== disabled) {
                this._nextState({ disabled: disabled });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "displayMonths", {
        set: /**
         * @param {?} displayMonths
         * @return {?}
         */
        function (displayMonths) {
            displayMonths = toInteger(displayMonths);
            if (isInteger(displayMonths) && displayMonths > 0 && this._state.displayMonths !== displayMonths) {
                this._nextState({ displayMonths: displayMonths });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "firstDayOfWeek", {
        set: /**
         * @param {?} firstDayOfWeek
         * @return {?}
         */
        function (firstDayOfWeek) {
            firstDayOfWeek = toInteger(firstDayOfWeek);
            if (isInteger(firstDayOfWeek) && firstDayOfWeek >= 0 && this._state.firstDayOfWeek !== firstDayOfWeek) {
                this._nextState({ firstDayOfWeek: firstDayOfWeek });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "focusVisible", {
        set: /**
         * @param {?} focusVisible
         * @return {?}
         */
        function (focusVisible) {
            if (this._state.focusVisible !== focusVisible && !this._state.disabled) {
                this._nextState({ focusVisible: focusVisible });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "maxDate", {
        set: /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            /** @type {?} */
            var maxDate = this.toValidDate(date, null);
            if (isChangedDate(this._state.maxDate, maxDate)) {
                this._nextState({ maxDate: maxDate });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "markDisabled", {
        set: /**
         * @param {?} markDisabled
         * @return {?}
         */
        function (markDisabled) {
            if (this._state.markDisabled !== markDisabled) {
                this._nextState({ markDisabled: markDisabled });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "minDate", {
        set: /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            /** @type {?} */
            var minDate = this.toValidDate(date, null);
            if (isChangedDate(this._state.minDate, minDate)) {
                this._nextState({ minDate: minDate });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "navigation", {
        set: /**
         * @param {?} navigation
         * @return {?}
         */
        function (navigation) {
            if (this._state.navigation !== navigation) {
                this._nextState({ navigation: navigation });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "outsideDays", {
        set: /**
         * @param {?} outsideDays
         * @return {?}
         */
        function (outsideDays) {
            if (this._state.outsideDays !== outsideDays) {
                this._nextState({ outsideDays: outsideDays });
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} date
     * @return {?}
     */
    NgbDatepickerService.prototype.focus = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (!this._state.disabled && this._calendar.isValid(date) && isChangedDate(this._state.focusDate, date)) {
            this._nextState({ focusDate: date });
        }
    };
    /**
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    NgbDatepickerService.prototype.focusMove = /**
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    function (period, number) {
        this.focus(this._calendar.getNext(this._state.focusDate, period, number));
    };
    /**
     * @return {?}
     */
    NgbDatepickerService.prototype.focusSelect = /**
     * @return {?}
     */
    function () {
        if (isDateSelectable(this._state.focusDate, this._state)) {
            this.select(this._state.focusDate, { emitEvent: true });
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbDatepickerService.prototype.open = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var firstDate = this.toValidDate(date, this._calendar.getToday());
        if (!this._state.disabled) {
            this._nextState({ firstDate: firstDate });
        }
    };
    /**
     * @param {?} date
     * @param {?=} options
     * @return {?}
     */
    NgbDatepickerService.prototype.select = /**
     * @param {?} date
     * @param {?=} options
     * @return {?}
     */
    function (date, options) {
        if (options === void 0) { options = {}; }
        /** @type {?} */
        var selectedDate = this.toValidDate(date, null);
        if (!this._state.disabled) {
            if (isChangedDate(this._state.selectedDate, selectedDate)) {
                this._nextState({ selectedDate: selectedDate });
            }
            if (options.emitEvent && isDateSelectable(selectedDate, this._state)) {
                this._select$.next(selectedDate);
            }
        }
    };
    /**
     * @param {?} date
     * @param {?=} defaultValue
     * @return {?}
     */
    NgbDatepickerService.prototype.toValidDate = /**
     * @param {?} date
     * @param {?=} defaultValue
     * @return {?}
     */
    function (date, defaultValue) {
        /** @type {?} */
        var ngbDate = NgbDate.from(date);
        if (defaultValue === undefined) {
            defaultValue = this._calendar.getToday();
        }
        return this._calendar.isValid(ngbDate) ? ngbDate : defaultValue;
    };
    /**
     * @param {?} patch
     * @return {?}
     */
    NgbDatepickerService.prototype._nextState = /**
     * @param {?} patch
     * @return {?}
     */
    function (patch) {
        /** @type {?} */
        var newState = this._updateState(patch);
        this._patchContexts(newState);
        this._state = newState;
        this._model$.next(this._state);
    };
    /**
     * @param {?} state
     * @return {?}
     */
    NgbDatepickerService.prototype._patchContexts = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        var months = state.months, displayMonths = state.displayMonths, selectedDate = state.selectedDate, focusDate = state.focusDate, focusVisible = state.focusVisible, disabled = state.disabled, outsideDays = state.outsideDays;
        state.months.forEach(function (month) {
            month.weeks.forEach(function (week) {
                week.days.forEach(function (day) {
                    // patch focus flag
                    if (focusDate) {
                        day.context.focused = focusDate.equals(day.date) && focusVisible;
                    }
                    // calculating tabindex
                    day.tabindex = !disabled && day.date.equals(focusDate) && focusDate.month === month.number ? 0 : -1;
                    // override context disabled
                    if (disabled === true) {
                        day.context.disabled = true;
                    }
                    // patch selection flag
                    if (selectedDate !== undefined) {
                        day.context.selected = selectedDate !== null && selectedDate.equals(day.date);
                    }
                    // visibility
                    if (month.number !== day.date.month) {
                        day.hidden = outsideDays === 'hidden' || outsideDays === 'collapsed' ||
                            (displayMonths > 1 && day.date.after(months[0].firstDate) &&
                                day.date.before(months[displayMonths - 1].lastDate));
                    }
                });
            });
        });
    };
    /**
     * @param {?} patch
     * @return {?}
     */
    NgbDatepickerService.prototype._updateState = /**
     * @param {?} patch
     * @return {?}
     */
    function (patch) {
        // patching fields
        /** @type {?} */
        var state = Object.assign({}, this._state, patch);
        /** @type {?} */
        var startDate = state.firstDate;
        // min/max dates changed
        if ('minDate' in patch || 'maxDate' in patch) {
            checkMinBeforeMax(state.minDate, state.maxDate);
            state.focusDate = checkDateInRange(state.focusDate, state.minDate, state.maxDate);
            state.firstDate = checkDateInRange(state.firstDate, state.minDate, state.maxDate);
            startDate = state.focusDate;
        }
        // disabled
        if ('disabled' in patch) {
            state.focusVisible = false;
        }
        // initial rebuild via 'select()'
        if ('selectedDate' in patch && this._state.months.length === 0) {
            startDate = state.selectedDate;
        }
        // focus date changed
        if ('focusDate' in patch) {
            state.focusDate = checkDateInRange(state.focusDate, state.minDate, state.maxDate);
            startDate = state.focusDate;
            // nothing to rebuild if only focus changed and it is still visible
            if (state.months.length !== 0 && !state.focusDate.before(state.firstDate) &&
                !state.focusDate.after(state.lastDate)) {
                return state;
            }
        }
        // first date changed
        if ('firstDate' in patch) {
            state.firstDate = checkDateInRange(state.firstDate, state.minDate, state.maxDate);
            startDate = state.firstDate;
        }
        // rebuilding months
        if (startDate) {
            /** @type {?} */
            var forceRebuild = 'dayTemplateData' in patch || 'firstDayOfWeek' in patch || 'markDisabled' in patch ||
                'minDate' in patch || 'maxDate' in patch || 'disabled' in patch || 'outsideDays' in patch;
            /** @type {?} */
            var months = buildMonths(this._calendar, startDate, state, this._i18n, forceRebuild);
            // updating months and boundary dates
            state.months = months;
            state.firstDate = months.length > 0 ? months[0].firstDate : undefined;
            state.lastDate = months.length > 0 ? months[months.length - 1].lastDate : undefined;
            // reset selected date if 'markDisabled' returns true
            if ('selectedDate' in patch && !isDateSelectable(state.selectedDate, state)) {
                state.selectedDate = null;
            }
            // adjusting focus after months were built
            if ('firstDate' in patch) {
                if (state.focusDate === undefined || state.focusDate.before(state.firstDate) ||
                    state.focusDate.after(state.lastDate)) {
                    state.focusDate = startDate;
                }
            }
            // adjusting months/years for the select box navigation
            /** @type {?} */
            var yearChanged = !this._state.firstDate || this._state.firstDate.year !== state.firstDate.year;
            /** @type {?} */
            var monthChanged = !this._state.firstDate || this._state.firstDate.month !== state.firstDate.month;
            if (state.navigation === 'select') {
                // years ->  boundaries (min/max were changed)
                if ('minDate' in patch || 'maxDate' in patch || state.selectBoxes.years.length === 0 || yearChanged) {
                    state.selectBoxes.years = generateSelectBoxYears(state.firstDate, state.minDate, state.maxDate);
                }
                // months -> when current year or boundaries change
                if ('minDate' in patch || 'maxDate' in patch || state.selectBoxes.months.length === 0 || yearChanged) {
                    state.selectBoxes.months =
                        generateSelectBoxMonths(this._calendar, state.firstDate, state.minDate, state.maxDate);
                }
            }
            else {
                state.selectBoxes = { years: [], months: [] };
            }
            // updating navigation arrows -> boundaries change (min/max) or month/year changes
            if ((state.navigation === 'arrows' || state.navigation === 'select') &&
                (monthChanged || yearChanged || 'minDate' in patch || 'maxDate' in patch || 'disabled' in patch)) {
                state.prevDisabled = state.disabled || prevMonthDisabled(this._calendar, state.firstDate, state.minDate);
                state.nextDisabled = state.disabled || nextMonthDisabled(this._calendar, state.lastDate, state.maxDate);
            }
        }
        return state;
    };
    NgbDatepickerService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NgbDatepickerService.ctorParameters = function () { return [
        { type: NgbCalendar },
        { type: NgbDatepickerI18n }
    ]; };
    return NgbDatepickerService;
}());
export { NgbDatepickerService };
if (false) {
    /** @type {?} */
    NgbDatepickerService.prototype._model$;
    /** @type {?} */
    NgbDatepickerService.prototype._select$;
    /** @type {?} */
    NgbDatepickerService.prototype._state;
    /** @type {?} */
    NgbDatepickerService.prototype._calendar;
    /** @type {?} */
    NgbDatepickerService.prototype._i18n;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL2RhdGVwaWNrZXItc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFdBQVcsRUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFHbkMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsU0FBUyxFQUFFLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUNsRCxPQUFPLEVBQWEsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFDTCxXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQixhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLHNCQUFzQixFQUN0Qix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNsQixNQUFNLG9CQUFvQixDQUFDO0FBRTVCLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUVwRDtJQXdGRSw4QkFBb0IsU0FBc0IsRUFBVSxLQUF3QjtRQUF4RCxjQUFTLEdBQVQsU0FBUyxDQUFhO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUF0RnBFLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBdUIsQ0FBQztRQUU3QyxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztRQUVsQyxXQUFNLEdBQXdCO1lBQ3BDLFFBQVEsRUFBRSxLQUFLO1lBQ2YsYUFBYSxFQUFFLENBQUM7WUFDaEIsY0FBYyxFQUFFLENBQUM7WUFDakIsWUFBWSxFQUFFLEtBQUs7WUFDbkIsTUFBTSxFQUFFLEVBQUU7WUFD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LENBQUMsRUFBRTtnQkFDcEcsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsUUFBUSxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3pHLEtBQUssQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLFFBQVEsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3pHO1NBQ0Y7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7O2dCQTlRRixVQUFVOzs7O2dCQXRCSCxXQUFXO2dCQW9CWCxpQkFBaUI7O0lBaVJ6QiwyQkFBQztDQUFBLEFBL1FELElBK1FDO1NBOVFZLG9CQUFvQjs7O0lBQy9CLHVDQUFxRDs7SUFFckQsd0NBQTBDOztJQUUxQyxzQ0FZRTs7SUFzRVUseUNBQThCOztJQUFFLHFDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdiQ2FsZW5kYXIsIE5nYlBlcmlvZH0gZnJvbSAnLi9uZ2ItY2FsZW5kYXInO1xuaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xuaW1wb3J0IHtEYXRlcGlja2VyVmlld01vZGVsLCBOZ2JEYXlUZW1wbGF0ZURhdGEsIE5nYk1hcmtEaXNhYmxlZH0gZnJvbSAnLi9kYXRlcGlja2VyLXZpZXctbW9kZWwnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aXNJbnRlZ2VyLCB0b0ludGVnZXJ9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgYnVpbGRNb250aHMsXG4gIGNoZWNrRGF0ZUluUmFuZ2UsXG4gIGNoZWNrTWluQmVmb3JlTWF4LFxuICBpc0NoYW5nZWREYXRlLFxuICBpc0RhdGVTZWxlY3RhYmxlLFxuICBnZW5lcmF0ZVNlbGVjdEJveFllYXJzLFxuICBnZW5lcmF0ZVNlbGVjdEJveE1vbnRocyxcbiAgcHJldk1vbnRoRGlzYWJsZWQsXG4gIG5leHRNb250aERpc2FibGVkXG59IGZyb20gJy4vZGF0ZXBpY2tlci10b29scyc7XG5cbmltcG9ydCB7ZmlsdGVyfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge05nYkRhdGVwaWNrZXJJMThufSBmcm9tICcuL2RhdGVwaWNrZXItaTE4bic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyU2VydmljZSB7XG4gIHByaXZhdGUgX21vZGVsJCA9IG5ldyBTdWJqZWN0PERhdGVwaWNrZXJWaWV3TW9kZWw+KCk7XG5cbiAgcHJpdmF0ZSBfc2VsZWN0JCA9IG5ldyBTdWJqZWN0PE5nYkRhdGU+KCk7XG5cbiAgcHJpdmF0ZSBfc3RhdGU6IERhdGVwaWNrZXJWaWV3TW9kZWwgPSB7XG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgIGRpc3BsYXlNb250aHM6IDEsXG4gICAgZmlyc3REYXlPZldlZWs6IDEsXG4gICAgZm9jdXNWaXNpYmxlOiBmYWxzZSxcbiAgICBtb250aHM6IFtdLFxuICAgIG5hdmlnYXRpb246ICdzZWxlY3QnLFxuICAgIG91dHNpZGVEYXlzOiAndmlzaWJsZScsXG4gICAgcHJldkRpc2FibGVkOiBmYWxzZSxcbiAgICBuZXh0RGlzYWJsZWQ6IGZhbHNlLFxuICAgIHNlbGVjdEJveGVzOiB7eWVhcnM6IFtdLCBtb250aHM6IFtdfSxcbiAgICBzZWxlY3RlZERhdGU6IG51bGxcbiAgfTtcblxuICBnZXQgbW9kZWwkKCk6IE9ic2VydmFibGU8RGF0ZXBpY2tlclZpZXdNb2RlbD4geyByZXR1cm4gdGhpcy5fbW9kZWwkLnBpcGUoZmlsdGVyKG1vZGVsID0+IG1vZGVsLm1vbnRocy5sZW5ndGggPiAwKSk7IH1cblxuICBnZXQgc2VsZWN0JCgpOiBPYnNlcnZhYmxlPE5nYkRhdGU+IHsgcmV0dXJuIHRoaXMuX3NlbGVjdCQucGlwZShmaWx0ZXIoZGF0ZSA9PiBkYXRlICE9PSBudWxsKSk7IH1cblxuICBzZXQgZGF5VGVtcGxhdGVEYXRhKGRheVRlbXBsYXRlRGF0YTogTmdiRGF5VGVtcGxhdGVEYXRhKSB7XG4gICAgaWYgKHRoaXMuX3N0YXRlLmRheVRlbXBsYXRlRGF0YSAhPT0gZGF5VGVtcGxhdGVEYXRhKSB7XG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe2RheVRlbXBsYXRlRGF0YX0pO1xuICAgIH1cbiAgfVxuXG4gIHNldCBkaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLl9zdGF0ZS5kaXNhYmxlZCAhPT0gZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX25leHRTdGF0ZSh7ZGlzYWJsZWR9KTtcbiAgICB9XG4gIH1cblxuICBzZXQgZGlzcGxheU1vbnRocyhkaXNwbGF5TW9udGhzOiBudW1iZXIpIHtcbiAgICBkaXNwbGF5TW9udGhzID0gdG9JbnRlZ2VyKGRpc3BsYXlNb250aHMpO1xuICAgIGlmIChpc0ludGVnZXIoZGlzcGxheU1vbnRocykgJiYgZGlzcGxheU1vbnRocyA+IDAgJiYgdGhpcy5fc3RhdGUuZGlzcGxheU1vbnRocyAhPT0gZGlzcGxheU1vbnRocykge1xuICAgICAgdGhpcy5fbmV4dFN0YXRlKHtkaXNwbGF5TW9udGhzfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0IGZpcnN0RGF5T2ZXZWVrKGZpcnN0RGF5T2ZXZWVrOiBudW1iZXIpIHtcbiAgICBmaXJzdERheU9mV2VlayA9IHRvSW50ZWdlcihmaXJzdERheU9mV2Vlayk7XG4gICAgaWYgKGlzSW50ZWdlcihmaXJzdERheU9mV2VlaykgJiYgZmlyc3REYXlPZldlZWsgPj0gMCAmJiB0aGlzLl9zdGF0ZS5maXJzdERheU9mV2VlayAhPT0gZmlyc3REYXlPZldlZWspIHtcbiAgICAgIHRoaXMuX25leHRTdGF0ZSh7Zmlyc3REYXlPZldlZWt9KTtcbiAgICB9XG4gIH1cblxuICBzZXQgZm9jdXNWaXNpYmxlKGZvY3VzVmlzaWJsZTogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLl9zdGF0ZS5mb2N1c1Zpc2libGUgIT09IGZvY3VzVmlzaWJsZSAmJiAhdGhpcy5fc3RhdGUuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX25leHRTdGF0ZSh7Zm9jdXNWaXNpYmxlfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0IG1heERhdGUoZGF0ZTogTmdiRGF0ZSkge1xuICAgIGNvbnN0IG1heERhdGUgPSB0aGlzLnRvVmFsaWREYXRlKGRhdGUsIG51bGwpO1xuICAgIGlmIChpc0NoYW5nZWREYXRlKHRoaXMuX3N0YXRlLm1heERhdGUsIG1heERhdGUpKSB7XG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe21heERhdGV9KTtcbiAgICB9XG4gIH1cblxuICBzZXQgbWFya0Rpc2FibGVkKG1hcmtEaXNhYmxlZDogTmdiTWFya0Rpc2FibGVkKSB7XG4gICAgaWYgKHRoaXMuX3N0YXRlLm1hcmtEaXNhYmxlZCAhPT0gbWFya0Rpc2FibGVkKSB7XG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe21hcmtEaXNhYmxlZH0pO1xuICAgIH1cbiAgfVxuXG4gIHNldCBtaW5EYXRlKGRhdGU6IE5nYkRhdGUpIHtcbiAgICBjb25zdCBtaW5EYXRlID0gdGhpcy50b1ZhbGlkRGF0ZShkYXRlLCBudWxsKTtcbiAgICBpZiAoaXNDaGFuZ2VkRGF0ZSh0aGlzLl9zdGF0ZS5taW5EYXRlLCBtaW5EYXRlKSkge1xuICAgICAgdGhpcy5fbmV4dFN0YXRlKHttaW5EYXRlfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0IG5hdmlnYXRpb24obmF2aWdhdGlvbjogJ3NlbGVjdCcgfCAnYXJyb3dzJyB8ICdub25lJykge1xuICAgIGlmICh0aGlzLl9zdGF0ZS5uYXZpZ2F0aW9uICE9PSBuYXZpZ2F0aW9uKSB7XG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe25hdmlnYXRpb259KTtcbiAgICB9XG4gIH1cblxuICBzZXQgb3V0c2lkZURheXMob3V0c2lkZURheXM6ICd2aXNpYmxlJyB8ICdjb2xsYXBzZWQnIHwgJ2hpZGRlbicpIHtcbiAgICBpZiAodGhpcy5fc3RhdGUub3V0c2lkZURheXMgIT09IG91dHNpZGVEYXlzKSB7XG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe291dHNpZGVEYXlzfSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2FsZW5kYXI6IE5nYkNhbGVuZGFyLCBwcml2YXRlIF9pMThuOiBOZ2JEYXRlcGlja2VySTE4bikge31cblxuICBmb2N1cyhkYXRlOiBOZ2JEYXRlKSB7XG4gICAgaWYgKCF0aGlzLl9zdGF0ZS5kaXNhYmxlZCAmJiB0aGlzLl9jYWxlbmRhci5pc1ZhbGlkKGRhdGUpICYmIGlzQ2hhbmdlZERhdGUodGhpcy5fc3RhdGUuZm9jdXNEYXRlLCBkYXRlKSkge1xuICAgICAgdGhpcy5fbmV4dFN0YXRlKHtmb2N1c0RhdGU6IGRhdGV9KTtcbiAgICB9XG4gIH1cblxuICBmb2N1c01vdmUocGVyaW9kPzogTmdiUGVyaW9kLCBudW1iZXI/OiBudW1iZXIpIHtcbiAgICB0aGlzLmZvY3VzKHRoaXMuX2NhbGVuZGFyLmdldE5leHQodGhpcy5fc3RhdGUuZm9jdXNEYXRlLCBwZXJpb2QsIG51bWJlcikpO1xuICB9XG5cbiAgZm9jdXNTZWxlY3QoKSB7XG4gICAgaWYgKGlzRGF0ZVNlbGVjdGFibGUodGhpcy5fc3RhdGUuZm9jdXNEYXRlLCB0aGlzLl9zdGF0ZSkpIHtcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuX3N0YXRlLmZvY3VzRGF0ZSwge2VtaXRFdmVudDogdHJ1ZX0pO1xuICAgIH1cbiAgfVxuXG4gIG9wZW4oZGF0ZTogTmdiRGF0ZSkge1xuICAgIGNvbnN0IGZpcnN0RGF0ZSA9IHRoaXMudG9WYWxpZERhdGUoZGF0ZSwgdGhpcy5fY2FsZW5kYXIuZ2V0VG9kYXkoKSk7XG4gICAgaWYgKCF0aGlzLl9zdGF0ZS5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5fbmV4dFN0YXRlKHtmaXJzdERhdGV9KTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3QoZGF0ZTogTmdiRGF0ZSwgb3B0aW9uczoge2VtaXRFdmVudD86IGJvb2xlYW59ID0ge30pIHtcbiAgICBjb25zdCBzZWxlY3RlZERhdGUgPSB0aGlzLnRvVmFsaWREYXRlKGRhdGUsIG51bGwpO1xuICAgIGlmICghdGhpcy5fc3RhdGUuZGlzYWJsZWQpIHtcbiAgICAgIGlmIChpc0NoYW5nZWREYXRlKHRoaXMuX3N0YXRlLnNlbGVjdGVkRGF0ZSwgc2VsZWN0ZWREYXRlKSkge1xuICAgICAgICB0aGlzLl9uZXh0U3RhdGUoe3NlbGVjdGVkRGF0ZX0pO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5lbWl0RXZlbnQgJiYgaXNEYXRlU2VsZWN0YWJsZShzZWxlY3RlZERhdGUsIHRoaXMuX3N0YXRlKSkge1xuICAgICAgICB0aGlzLl9zZWxlY3QkLm5leHQoc2VsZWN0ZWREYXRlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0b1ZhbGlkRGF0ZShkYXRlOiBOZ2JEYXRlU3RydWN0LCBkZWZhdWx0VmFsdWU/OiBOZ2JEYXRlKTogTmdiRGF0ZSB7XG4gICAgY29uc3QgbmdiRGF0ZSA9IE5nYkRhdGUuZnJvbShkYXRlKTtcbiAgICBpZiAoZGVmYXVsdFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGRlZmF1bHRWYWx1ZSA9IHRoaXMuX2NhbGVuZGFyLmdldFRvZGF5KCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jYWxlbmRhci5pc1ZhbGlkKG5nYkRhdGUpID8gbmdiRGF0ZSA6IGRlZmF1bHRWYWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX25leHRTdGF0ZShwYXRjaDogUGFydGlhbDxEYXRlcGlja2VyVmlld01vZGVsPikge1xuICAgIGNvbnN0IG5ld1N0YXRlID0gdGhpcy5fdXBkYXRlU3RhdGUocGF0Y2gpO1xuICAgIHRoaXMuX3BhdGNoQ29udGV4dHMobmV3U3RhdGUpO1xuICAgIHRoaXMuX3N0YXRlID0gbmV3U3RhdGU7XG4gICAgdGhpcy5fbW9kZWwkLm5leHQodGhpcy5fc3RhdGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGF0Y2hDb250ZXh0cyhzdGF0ZTogRGF0ZXBpY2tlclZpZXdNb2RlbCkge1xuICAgIGNvbnN0IHttb250aHMsIGRpc3BsYXlNb250aHMsIHNlbGVjdGVkRGF0ZSwgZm9jdXNEYXRlLCBmb2N1c1Zpc2libGUsIGRpc2FibGVkLCBvdXRzaWRlRGF5c30gPSBzdGF0ZTtcbiAgICBzdGF0ZS5tb250aHMuZm9yRWFjaChtb250aCA9PiB7XG4gICAgICBtb250aC53ZWVrcy5mb3JFYWNoKHdlZWsgPT4ge1xuICAgICAgICB3ZWVrLmRheXMuZm9yRWFjaChkYXkgPT4ge1xuXG4gICAgICAgICAgLy8gcGF0Y2ggZm9jdXMgZmxhZ1xuICAgICAgICAgIGlmIChmb2N1c0RhdGUpIHtcbiAgICAgICAgICAgIGRheS5jb250ZXh0LmZvY3VzZWQgPSBmb2N1c0RhdGUuZXF1YWxzKGRheS5kYXRlKSAmJiBmb2N1c1Zpc2libGU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gY2FsY3VsYXRpbmcgdGFiaW5kZXhcbiAgICAgICAgICBkYXkudGFiaW5kZXggPSAhZGlzYWJsZWQgJiYgZGF5LmRhdGUuZXF1YWxzKGZvY3VzRGF0ZSkgJiYgZm9jdXNEYXRlLm1vbnRoID09PSBtb250aC5udW1iZXIgPyAwIDogLTE7XG5cbiAgICAgICAgICAvLyBvdmVycmlkZSBjb250ZXh0IGRpc2FibGVkXG4gICAgICAgICAgaWYgKGRpc2FibGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICBkYXkuY29udGV4dC5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gcGF0Y2ggc2VsZWN0aW9uIGZsYWdcbiAgICAgICAgICBpZiAoc2VsZWN0ZWREYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRheS5jb250ZXh0LnNlbGVjdGVkID0gc2VsZWN0ZWREYXRlICE9PSBudWxsICYmIHNlbGVjdGVkRGF0ZS5lcXVhbHMoZGF5LmRhdGUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHZpc2liaWxpdHlcbiAgICAgICAgICBpZiAobW9udGgubnVtYmVyICE9PSBkYXkuZGF0ZS5tb250aCkge1xuICAgICAgICAgICAgZGF5LmhpZGRlbiA9IG91dHNpZGVEYXlzID09PSAnaGlkZGVuJyB8fCBvdXRzaWRlRGF5cyA9PT0gJ2NvbGxhcHNlZCcgfHxcbiAgICAgICAgICAgICAgICAoZGlzcGxheU1vbnRocyA+IDEgJiYgZGF5LmRhdGUuYWZ0ZXIobW9udGhzWzBdLmZpcnN0RGF0ZSkgJiZcbiAgICAgICAgICAgICAgICAgZGF5LmRhdGUuYmVmb3JlKG1vbnRoc1tkaXNwbGF5TW9udGhzIC0gMV0ubGFzdERhdGUpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVTdGF0ZShwYXRjaDogUGFydGlhbDxEYXRlcGlja2VyVmlld01vZGVsPik6IERhdGVwaWNrZXJWaWV3TW9kZWwge1xuICAgIC8vIHBhdGNoaW5nIGZpZWxkc1xuICAgIGNvbnN0IHN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fc3RhdGUsIHBhdGNoKTtcblxuICAgIGxldCBzdGFydERhdGUgPSBzdGF0ZS5maXJzdERhdGU7XG5cbiAgICAvLyBtaW4vbWF4IGRhdGVzIGNoYW5nZWRcbiAgICBpZiAoJ21pbkRhdGUnIGluIHBhdGNoIHx8ICdtYXhEYXRlJyBpbiBwYXRjaCkge1xuICAgICAgY2hlY2tNaW5CZWZvcmVNYXgoc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG4gICAgICBzdGF0ZS5mb2N1c0RhdGUgPSBjaGVja0RhdGVJblJhbmdlKHN0YXRlLmZvY3VzRGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG4gICAgICBzdGF0ZS5maXJzdERhdGUgPSBjaGVja0RhdGVJblJhbmdlKHN0YXRlLmZpcnN0RGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG4gICAgICBzdGFydERhdGUgPSBzdGF0ZS5mb2N1c0RhdGU7XG4gICAgfVxuXG4gICAgLy8gZGlzYWJsZWRcbiAgICBpZiAoJ2Rpc2FibGVkJyBpbiBwYXRjaCkge1xuICAgICAgc3RhdGUuZm9jdXNWaXNpYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gaW5pdGlhbCByZWJ1aWxkIHZpYSAnc2VsZWN0KCknXG4gICAgaWYgKCdzZWxlY3RlZERhdGUnIGluIHBhdGNoICYmIHRoaXMuX3N0YXRlLm1vbnRocy5sZW5ndGggPT09IDApIHtcbiAgICAgIHN0YXJ0RGF0ZSA9IHN0YXRlLnNlbGVjdGVkRGF0ZTtcbiAgICB9XG5cbiAgICAvLyBmb2N1cyBkYXRlIGNoYW5nZWRcbiAgICBpZiAoJ2ZvY3VzRGF0ZScgaW4gcGF0Y2gpIHtcbiAgICAgIHN0YXRlLmZvY3VzRGF0ZSA9IGNoZWNrRGF0ZUluUmFuZ2Uoc3RhdGUuZm9jdXNEYXRlLCBzdGF0ZS5taW5EYXRlLCBzdGF0ZS5tYXhEYXRlKTtcbiAgICAgIHN0YXJ0RGF0ZSA9IHN0YXRlLmZvY3VzRGF0ZTtcblxuICAgICAgLy8gbm90aGluZyB0byByZWJ1aWxkIGlmIG9ubHkgZm9jdXMgY2hhbmdlZCBhbmQgaXQgaXMgc3RpbGwgdmlzaWJsZVxuICAgICAgaWYgKHN0YXRlLm1vbnRocy5sZW5ndGggIT09IDAgJiYgIXN0YXRlLmZvY3VzRGF0ZS5iZWZvcmUoc3RhdGUuZmlyc3REYXRlKSAmJlxuICAgICAgICAgICFzdGF0ZS5mb2N1c0RhdGUuYWZ0ZXIoc3RhdGUubGFzdERhdGUpKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmaXJzdCBkYXRlIGNoYW5nZWRcbiAgICBpZiAoJ2ZpcnN0RGF0ZScgaW4gcGF0Y2gpIHtcbiAgICAgIHN0YXRlLmZpcnN0RGF0ZSA9IGNoZWNrRGF0ZUluUmFuZ2Uoc3RhdGUuZmlyc3REYXRlLCBzdGF0ZS5taW5EYXRlLCBzdGF0ZS5tYXhEYXRlKTtcbiAgICAgIHN0YXJ0RGF0ZSA9IHN0YXRlLmZpcnN0RGF0ZTtcbiAgICB9XG5cbiAgICAvLyByZWJ1aWxkaW5nIG1vbnRoc1xuICAgIGlmIChzdGFydERhdGUpIHtcbiAgICAgIGNvbnN0IGZvcmNlUmVidWlsZCA9ICdkYXlUZW1wbGF0ZURhdGEnIGluIHBhdGNoIHx8ICdmaXJzdERheU9mV2VlaycgaW4gcGF0Y2ggfHwgJ21hcmtEaXNhYmxlZCcgaW4gcGF0Y2ggfHxcbiAgICAgICAgICAnbWluRGF0ZScgaW4gcGF0Y2ggfHwgJ21heERhdGUnIGluIHBhdGNoIHx8ICdkaXNhYmxlZCcgaW4gcGF0Y2ggfHwgJ291dHNpZGVEYXlzJyBpbiBwYXRjaDtcblxuICAgICAgY29uc3QgbW9udGhzID0gYnVpbGRNb250aHModGhpcy5fY2FsZW5kYXIsIHN0YXJ0RGF0ZSwgc3RhdGUsIHRoaXMuX2kxOG4sIGZvcmNlUmVidWlsZCk7XG5cbiAgICAgIC8vIHVwZGF0aW5nIG1vbnRocyBhbmQgYm91bmRhcnkgZGF0ZXNcbiAgICAgIHN0YXRlLm1vbnRocyA9IG1vbnRocztcbiAgICAgIHN0YXRlLmZpcnN0RGF0ZSA9IG1vbnRocy5sZW5ndGggPiAwID8gbW9udGhzWzBdLmZpcnN0RGF0ZSA6IHVuZGVmaW5lZDtcbiAgICAgIHN0YXRlLmxhc3REYXRlID0gbW9udGhzLmxlbmd0aCA+IDAgPyBtb250aHNbbW9udGhzLmxlbmd0aCAtIDFdLmxhc3REYXRlIDogdW5kZWZpbmVkO1xuXG4gICAgICAvLyByZXNldCBzZWxlY3RlZCBkYXRlIGlmICdtYXJrRGlzYWJsZWQnIHJldHVybnMgdHJ1ZVxuICAgICAgaWYgKCdzZWxlY3RlZERhdGUnIGluIHBhdGNoICYmICFpc0RhdGVTZWxlY3RhYmxlKHN0YXRlLnNlbGVjdGVkRGF0ZSwgc3RhdGUpKSB7XG4gICAgICAgIHN0YXRlLnNlbGVjdGVkRGF0ZSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIC8vIGFkanVzdGluZyBmb2N1cyBhZnRlciBtb250aHMgd2VyZSBidWlsdFxuICAgICAgaWYgKCdmaXJzdERhdGUnIGluIHBhdGNoKSB7XG4gICAgICAgIGlmIChzdGF0ZS5mb2N1c0RhdGUgPT09IHVuZGVmaW5lZCB8fCBzdGF0ZS5mb2N1c0RhdGUuYmVmb3JlKHN0YXRlLmZpcnN0RGF0ZSkgfHxcbiAgICAgICAgICAgIHN0YXRlLmZvY3VzRGF0ZS5hZnRlcihzdGF0ZS5sYXN0RGF0ZSkpIHtcbiAgICAgICAgICBzdGF0ZS5mb2N1c0RhdGUgPSBzdGFydERhdGU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gYWRqdXN0aW5nIG1vbnRocy95ZWFycyBmb3IgdGhlIHNlbGVjdCBib3ggbmF2aWdhdGlvblxuICAgICAgY29uc3QgeWVhckNoYW5nZWQgPSAhdGhpcy5fc3RhdGUuZmlyc3REYXRlIHx8IHRoaXMuX3N0YXRlLmZpcnN0RGF0ZS55ZWFyICE9PSBzdGF0ZS5maXJzdERhdGUueWVhcjtcbiAgICAgIGNvbnN0IG1vbnRoQ2hhbmdlZCA9ICF0aGlzLl9zdGF0ZS5maXJzdERhdGUgfHwgdGhpcy5fc3RhdGUuZmlyc3REYXRlLm1vbnRoICE9PSBzdGF0ZS5maXJzdERhdGUubW9udGg7XG4gICAgICBpZiAoc3RhdGUubmF2aWdhdGlvbiA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgICAgLy8geWVhcnMgLT4gIGJvdW5kYXJpZXMgKG1pbi9tYXggd2VyZSBjaGFuZ2VkKVxuICAgICAgICBpZiAoJ21pbkRhdGUnIGluIHBhdGNoIHx8ICdtYXhEYXRlJyBpbiBwYXRjaCB8fCBzdGF0ZS5zZWxlY3RCb3hlcy55ZWFycy5sZW5ndGggPT09IDAgfHwgeWVhckNoYW5nZWQpIHtcbiAgICAgICAgICBzdGF0ZS5zZWxlY3RCb3hlcy55ZWFycyA9IGdlbmVyYXRlU2VsZWN0Qm94WWVhcnMoc3RhdGUuZmlyc3REYXRlLCBzdGF0ZS5taW5EYXRlLCBzdGF0ZS5tYXhEYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1vbnRocyAtPiB3aGVuIGN1cnJlbnQgeWVhciBvciBib3VuZGFyaWVzIGNoYW5nZVxuICAgICAgICBpZiAoJ21pbkRhdGUnIGluIHBhdGNoIHx8ICdtYXhEYXRlJyBpbiBwYXRjaCB8fCBzdGF0ZS5zZWxlY3RCb3hlcy5tb250aHMubGVuZ3RoID09PSAwIHx8IHllYXJDaGFuZ2VkKSB7XG4gICAgICAgICAgc3RhdGUuc2VsZWN0Qm94ZXMubW9udGhzID1cbiAgICAgICAgICAgICAgZ2VuZXJhdGVTZWxlY3RCb3hNb250aHModGhpcy5fY2FsZW5kYXIsIHN0YXRlLmZpcnN0RGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlLnNlbGVjdEJveGVzID0ge3llYXJzOiBbXSwgbW9udGhzOiBbXX07XG4gICAgICB9XG5cbiAgICAgIC8vIHVwZGF0aW5nIG5hdmlnYXRpb24gYXJyb3dzIC0+IGJvdW5kYXJpZXMgY2hhbmdlIChtaW4vbWF4KSBvciBtb250aC95ZWFyIGNoYW5nZXNcbiAgICAgIGlmICgoc3RhdGUubmF2aWdhdGlvbiA9PT0gJ2Fycm93cycgfHwgc3RhdGUubmF2aWdhdGlvbiA9PT0gJ3NlbGVjdCcpICYmXG4gICAgICAgICAgKG1vbnRoQ2hhbmdlZCB8fCB5ZWFyQ2hhbmdlZCB8fCAnbWluRGF0ZScgaW4gcGF0Y2ggfHwgJ21heERhdGUnIGluIHBhdGNoIHx8ICdkaXNhYmxlZCcgaW4gcGF0Y2gpKSB7XG4gICAgICAgIHN0YXRlLnByZXZEaXNhYmxlZCA9IHN0YXRlLmRpc2FibGVkIHx8IHByZXZNb250aERpc2FibGVkKHRoaXMuX2NhbGVuZGFyLCBzdGF0ZS5maXJzdERhdGUsIHN0YXRlLm1pbkRhdGUpO1xuICAgICAgICBzdGF0ZS5uZXh0RGlzYWJsZWQgPSBzdGF0ZS5kaXNhYmxlZCB8fCBuZXh0TW9udGhEaXNhYmxlZCh0aGlzLl9jYWxlbmRhciwgc3RhdGUubGFzdERhdGUsIHN0YXRlLm1heERhdGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuIl19