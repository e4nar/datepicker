<template>
    <div class="calendar">
        <div class="header">

            <template v-if="!isRange || isRange && isFrom">
                <span class="chevron-container" @click="gotoMonth(-1)">
                    <b-icon-chevron-left></b-icon-chevron-left>
                </span>
            </template>
            <template v-else>
                <span style="width:36px;height:36px;display:inline-block;"></span>
            </template>

            <b-form-select
                class="select-month"
                v-model="renderPeriod.month"
                :options="options.months"
                size="sm" style="display:inline-block; width: 70px;"
            ></b-form-select>

            <b-form-select
                class="select-year"
                v-model="renderPeriod.year"
                :options="options.years"
                size="sm" style="display:inline-block; width: 70px;"
            ></b-form-select>

            <template v-if="!isRange || isRange && !isFrom">
                <span class="chevron-container" @click="gotoMonth(1)">
                    <b-icon-chevron-right></b-icon-chevron-right>
                </span>
            </template>
            <template v-else>
                <span style="width:36px;height:36px;display:inline-block;"></span>
            </template>

        </div>
        <div class="body">
            <table @mouseleave="handleMouseLeave">
                <thead>
                    <tr>
                        <th>Mo</th>
                        <th>Tu</th>
                        <th>We</th>
                        <th>Th</th>
                        <th>Fr</th>
                        <th>Sa</th>
                        <th>Su</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="tableCalendarDate in tableCalendarDates">
                        <td v-for="date in tableCalendarDate">
                            <span
                                :class="'date ' + getClassForDate(date)"
                                @click="selectDate(date)"
                                @mouseover="onHoverDate(date)"
                            >{{ date.text }}</span>
                        </td>
                    </tr>
                    <template v-if="tableCalendarDates.length < 6">
                        <tr v-for="tr in emptyTRs">
                            <td v-for="item in [0,1,2,3,4,5,6]">&nbsp;</td>
                        </tr>
                    </template>

                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import myMixins from '../mixins.js';

export default {
    name: "Calendar",
    mixins: [
        myMixins
    ],
    props: {
        selection: {
            type: Object,
            required: true
        },
        renderPeriod: {
            type: Object,
            required: true
        },
        isFrom: {
            type: Boolean,
            default: true
        },
        isRange: {
            type: Boolean,
            default: false
        },
        disabledDates : {
            type: Array,
            default: []
        },
        disabledMonthDates : {
            type: Array,
            default: []
        },
        disabledWeekDays : {
            type: Array,
            default: []
        },
        minDate : {
            type: String,
            default: function() {
                return null;
            }
        },
        maxDate : {
            type: String,
            default: function() {
                return null;
            }
        },
        hoverDate : {
            type: Date|null,
            default: function(){
                return null;
            }
        }
    },
    created() {
    },
    data() {
        return {
            today: new Date(),
        }
    },
    computed: {
        options: function() {
            let thisYear = _.isNull(this.renderPeriod.year) ? this.today.getFullYear() : this.renderPeriod.year;

            let toReturn = {
                years: [
                    thisYear - 2,
                    thisYear - 1,
                    thisYear,
                    thisYear + 1,
                    thisYear + 2,
                    thisYear + 3,
                ],
                months: this.getMonths()
            };

            return toReturn;
        },
        calendarDates() {
            let toReturn = [];

            let firstOfMonth = new Date(this.renderPeriod.year, this.renderPeriod.month, 1, 0, 0, 0);
            let firstOfMonthWeekDay = firstOfMonth.getDay();

            let totalPreviousDays = 0;

            if (firstOfMonthWeekDay != 1) { //add previous dates, if it is not Monday

                totalPreviousDays = firstOfMonthWeekDay > 1 ? firstOfMonthWeekDay - 1 : 6;

                for (let i = totalPreviousDays - 1; i >= 0; i-- ) {
                    let previousDate = new Date();
                    previousDate.setMonth(firstOfMonth.getMonth());
                    previousDate.setDate(- i);

                    toReturn.push({
                        value: previousDate,
                        text: previousDate.getDate(),
                        isLower: this.isLowerDateDuringSelection(previousDate),
                    });
                }
            }

            let lastOfMonth = new Date(this.renderPeriod.year, this.renderPeriod.month + 1, 0, 0, 0, 0);
            for (let i = 1; i <= lastOfMonth.getDate(); i++) {
                let d = new Date(this.renderPeriod.year, this.renderPeriod.month, i, 0, 0, 0);
                toReturn.push({
                    value: d,
                    text: d.getDate(),
                    isLower: this.isLowerDateDuringSelection(d),
                });
            }

            if (lastOfMonth.getDay() != 0) { //add next dates, if last day is not sunday
                let totalNextDays = 7 - lastOfMonth.getDay();
                for (let i = 1; i <= totalNextDays; i++) {
                    let d = new Date(this.renderPeriod.year, this.renderPeriod.month + 1, i, 0, 0, 0);
                    toReturn.push({
                        value: d,
                        text: d.getDate(),
                        isLower: this.isLowerDateDuringSelection(d),
                    });
                }
            }

            return toReturn;
        },
        tableCalendarDates() {
            return _.chunk(this.calendarDates, 7);
        },
        emptyTRs() {
            let toReturn = [];
            for(let i = 0; i < 6 - this.tableCalendarDates.length; i++ ){
                toReturn.push(i);
            }
            return toReturn;
        }
    },
    watch: {
        renderPeriod: {
            deep: true,
            handler: function(n) {
                this.$emit('calendar-render-period-changed', {
                    isFrom: this.isFrom,
                    data: this.renderPeriod
                });
            }
        },
    },
    methods: {
        gotoMonth: function (diff) {
            if (diff < 0 && this.renderPeriod.month === 0) {
                this.renderPeriod.month = 11;
                this.renderPeriod.year--;
            } else if (diff > 0 && this.renderPeriod.month === 11) {
                this.renderPeriod.month = 0;
                this.renderPeriod.year++;
            } else {
                this.renderPeriod.month += diff;
            }
        },
        getClassForDate: function (dateObject) {
            let date = dateObject.value;
            let toReturn = [];

            let dateString = this.getDateString(date);

            if (date.getMonth() !== this.renderPeriod.month) {
                toReturn.push('complementary-date')
            }

            if (this.disabledWeekDays.includes(date.getDay())) {
                toReturn.push('disabled-week-day');
            }
            if (this.disabledMonthDates.includes(date.getDate())) {
                toReturn.push('disabled-month-date');
            }

            if (this.disabledDates.includes(dateString)) {
                toReturn.push('disabled-month-date');
            }

            if (dateObject.isLower && this.isRange) {
                toReturn.push('disabled-lower-than-selection');
            }

            if (!_.isNull(this.minDate)) {
                let minDate = new Date(this.minDate);
                minDate.setHours(0, 0, 0);
                if (this.getSecondsSinceEpoch(date) < this.getSecondsSinceEpoch(minDate)) {
                    toReturn.push('disabled-min-date');
                }
            }
            if (!_.isNull(this.maxDate)) {
                let maxDate = new Date(this.maxDate);
                maxDate.setHours(0, 0, 0);
                if (this.getSecondsSinceEpoch(maxDate) < this.getSecondsSinceEpoch(date)) {
                    toReturn.push('disabled-max-date');
                }
            }

            if (
                this.getDateString(this.selection.date1) === dateString &&
                this.getDateString(this.selection.date2) === dateString &&
                this.isRange
            ) {
                toReturn.push('selected');
            } else if (this.getDateString(this.selection.date1) === dateString && this.isRange) {
                 toReturn.push('selected-from');
            } else if (this.getDateString(this.selection.date1) === dateString && !this.isRange) {
                toReturn.push('selected');
            } else if (dateString === this.getDateString(this.hoverDate)) {
                toReturn.push('selected');
            } else if (this.getDateString(this.selection.date2) === dateString && this.isRange) {
                 toReturn.push('selected-to');
            } else if (this.getDateString(this.selection.date2) === dateString && !this.isRange) {
                toReturn.push('selected');
            } else if (
                !_.isNull(this.selection.date1) && !_.isNull(this.selection.date2) &&
                dateString > this.getDateString(this.selection.date1) &&
                dateString < this.getDateString(this.selection.date2)
            ) {
                toReturn.push('in-range');
            } else if (
                !_.isNull(this.selection.date1) && _.isNull(this.selection.date2) &&
                dateString > this.getDateString(this.selection.date1) &&
                dateString < this.getDateString(this.hoverDate)
            ) {
                toReturn.push('in-range');
            }

            if (
                date.getFullYear() === this.today.getFullYear() &&
                date.getMonth() === this.today.getMonth() &&
                date.getDate() === this.today.getDate()
            ) {
                toReturn.push('today');
            }

            return toReturn.join(' ');
        },
        isLowerDateDuringSelection: function(date) {
            return (
                this.getSecondsSinceEpoch(date) < this.getSecondsSinceEpoch(this.selection.date1) &&
                _.isNull(this.selection.date2)
            );
        },
        selectDate: function(argDate) {
            let date = argDate.value;

            this.$emit('calendar-date-selected',  {
                isFrom: this.isFrom,
                data: date
            });
        },
        onHoverDate: function(dateObj){
            if (!this.isRange) {
                return;
            }
            this.$emit('calendar-date-hovered', {
                data: dateObj.value
            });
        },
        handleMouseLeave: function () {
            this.$emit('calendar-date-hovered', {
                data: null
            });
        },
    }
}
</script>