<template>
    <div class="datepicker">
        <div class="datepicker-container">
            <b-input-group size="sm" class="mb-2">
                <b-input-group-prepend is-text v-if="displayIcon">
                    <b-icon :icon="isRange ? 'calendar3-range' : 'calendar3-event'"></b-icon>
                </b-input-group-prepend>
                <b-form-input v-model="vModelDate" placeholder="select date" @click="open=true"></b-form-input>
            </b-input-group>
        </div>
        <div class="datepicker-popup" v-show="open" :style="datePickerStyle">
            <preview
                v-if="displayPreview"
                :is-range="isRange"
                :display-time="displayTime"
                :selection="selection"
            ></preview>
            <div class="calendars">
                <div>
                    <calendar
                        :render-period="render.calendar1"
                        :selection="selection"
                        :is-from="true"
                        :is-range="isRange"
                        :disabled-dates="disabledDates"
                        :disabled-month-dates="disabledMonthDates"
                        :disabled-week-days="disabledWeekDays"
                        :min-date="minDate"
                        :max-date="maxDate"
                        :hover-date="hoverDate"
                        @calendar-render-period-changed="changedRenderPeriod"
                        @calendar-date-selected="selectedDate"
                        @calendar-date-hovered="hoveredDate"
                    ></calendar>
                    <time-picker
                        v-if="displayTime"
                        :is-from="true"
                        :selection="selection"
                        @time-picker-change="changedTimePicker"
                    ></time-picker>
                </div>
                <div v-if="isRange">
                    <calendar
                        :render-period="render.calendar2"
                        :selection="selection"
                        :is-from="false"
                        :is-range="isRange"
                        :disabled-dates="disabledDates"
                        :disabled-month-dates="disabledMonthDates"
                        :disabled-week-days="disabledWeekDays"
                        :min-date="minDate"
                        :max-date="maxDate"
                        :hover-date="hoverDate"
                        @calendar-render-period-changed="changedRenderPeriod"
                        @calendar-date-selected="selectedDate"
                        @calendar-date-hovered="hoveredDate"
                    ></calendar>
                    <time-picker
                        v-if="displayTime"
                        :is-from="false"
                        :selection="selection"
                        @time-picker-change="changedTimePicker"
                    ></time-picker>
                </div>
            </div>
            <div class="footer-container clearfix px-2 mb-2">
                <b-button variant="primary" class="float-right" @click="apply" size="sm">Apply</b-button>
                <b-button variant="light" class="float-right mr-2" @click="clear" size="sm">Clear</b-button>
                <b-button variant="light" class="float-right mr-2" @click="cancel" size="sm">Cancel</b-button>

                <b-dropdown
                    v-if="isRange"
                    class="suggested-ranges float-left" variant="light"
                    size="sm"
                    dropup
                >
                    <template #button-content>
                        <b-icon-calendar-range></b-icon-calendar-range>
                    </template>
                    <template v-for="(suggestedRange, index) in suggestedRanges">

                        <template v-if="suggestedRange.text === 'divider'">
                            <b-dropdown-divider :key="index"></b-dropdown-divider>
                        </template>

                        <template v-else>
                            <b-dropdown-item
                                :key="index"
                                @click="setRange(suggestedRange)"
                            >{{ suggestedRange.text }}</b-dropdown-item>
                        </template>

                    </template>
                </b-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
import Calendar from "./Calendar";
import TimePicker from "./TimePicker";
import Preview from "./Preview";
import myMixins from '../mixins.js';

export default {
    name: 'Datepicker',
    components: {
        Calendar,
        TimePicker,
        Preview
    },
    mixins: [
        myMixins
    ],
    props: {
        isRange: {
            type: Boolean,
            default: false
        },
        displayIcon: {
            type: Boolean,
            default: true,
        },
        displayTime: {
            type: Boolean,
            default: false
        },
        value: {
            type: String,
            default: function() {
                return '';
            }
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
        displayPreview : {
            type: Boolean,
            default: true
        },
        suggestedRanges : {
            type: Array,
            default: function() {
                let today = new Date();

                let toReturn = [
                    {
                        text: 'Last year',
                        start: new Date(today.getFullYear() - 1, 0, 1, 0, 0, 0),
                        end: new Date(today.getFullYear() - 1, 11, 31, 23, 59, 59),
                    },
                    {
                        text: 'Last month',
                        start: new Date(today.getFullYear(), today.getMonth() - 1, 1, 0, 0, 0),
                        end: new Date(today.getFullYear(), today.getMonth(), -1, 23, 59, 59),
                    },
                    {
                        text: 'last 7 days',
                        start: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7, 0, 0, 0),
                        end: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 23, 59, 59),
                    },
                    {
                        text: 'Yesterday',
                        start: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 0, 0, 0),
                        end: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 23, 59, 59),
                    },
                    {
                        text: 'divider',
                    },
                    {
                        text: 'Today',
                        start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0),
                        end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59),
                    },
                    {
                        text: 'This month',
                        start: new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0),
                        end: new Date(today.getFullYear(), today.getMonth()+1, 0, 23, 59, 59),
                    },
                    {
                        text: 'This year',
                        start: new Date(today.getFullYear(), 0, 1, 0, 0, 0),
                        end: new Date(today.getFullYear()+1, 0, -1, 23, 59, 59),
                    },
                    {
                        text: 'divider',
                    },
                    {
                        text: 'Tomorrow',
                        start: new Date(today.getFullYear(), today.getMonth(), today.getDate()+1, 0, 0, 0),
                        end: new Date(today.getFullYear(), today.getMonth(), today.getDate()+1, 23, 59, 59),
                    },
                    {
                        text: 'Next 7 days',
                        start: new Date(today.getFullYear(), today.getMonth(), today.getDate()+1, 0, 0, 0),
                        end: new Date(today.getFullYear(), today.getMonth(), today.getDate()+7, 23, 59, 59),
                    },
                    {
                        text: 'Next month',
                        start: new Date(today.getFullYear(), today.getMonth()+1, 1, 0, 0, 0),
                        end: new Date(today.getFullYear(), today.getMonth()+2, -1, 23, 59, 59),
                    },
                ];

                return toReturn;
            }
        }
    },
    created() {
        this.initialize(this.value);
    },
    mounted : function() {
        document.body.addEventListener('click', this.doHide);
    },
    beforeDestroy() {
        document.body.removeEventListener('click', this.doHide);
    },
    data() {
        return {
            open: false,

            today: new Date(),

            vModelDate: null,
            selection: {
                date1: null,
                date2: null,
                time1: null,
                time2: null,
            },

            render: {
                calendar1: {
                    year: null,
                    month: null,
                },
                calendar2: {
                    year: null,
                    month: null,
                }
            },

            hoverDate: null,

            clearData: {
                vModelDate: '',

                selection: {
                    date1: null,
                    date2: null,
                    time1: {
                        hours: 0,
                        minutes: 0,
                        seconds: 0,
                    },
                    time2: {
                        hours: 23,
                        minutes: 59,
                        seconds: 59,
                    },
                },
            }
        }
    },
    computed : {
        datePickerStyle: function () {
            return {
                'width': (this.isRange ? 245 * 2 : 245) + 'px'
            }
        },
        finalSelection: function () {
            let toReturn = [];

            if (_.isNull(this.selection.date1)) {
                return toReturn.join('');
            }

            toReturn.push(this.getDateString(this.selection.date1));

            if (this.displayTime) {
                toReturn.push(' ' + this.getTimeString(this.selection.time1));
            }

            if (this.isRange && !_.isNull(this.selection.date2)) {

                toReturn.push(' - ' + this.getDateString(this.selection.date2));

                if (this.displayTime) {
                    toReturn.push(' ' + this.getTimeString(this.selection.time2));
                }
            }

            return toReturn.join('');
        }
    },
    watch: {
        value : function (n,o) {
            this.initialize(n);
        }
    },
    methods: {
        parseRange(input) {
            let toReturn = _.cloneDeep(this.clearData);

            input = _.trim(input);

            toReturn.vModelDate = input;

            if (!_.isEmpty(toReturn.vModelDate)) {
                let rangeParts = input.split(' - ');

                if (rangeParts.length === 2) {

                    let res = this.parseDateTime(rangeParts[0], true);
                    toReturn.selection.date1 = res.date;
                    toReturn.selection.time1 = res.time;

                    res = this.parseDateTime(rangeParts[1], false);
                    toReturn.selection.date2 = res.date;
                    toReturn.selection.time2 = res.time;

                } else if (rangeParts.length === 1) {

                    let res = this.parseDateTime(rangeParts[0], true);
                    toReturn.selection.date1 = res.date;
                    toReturn.selection.time1 = res.time;

                    if (this.isRange) {
                        toReturn.selection.date2 = res.date;
                        toReturn.selection.time2 = res.time;
                    }

                }
            }

            return toReturn;
        },
        parseDateTime(v, isFrom) {
            let toReturn = {
                date: null,
                time: {
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                }
            };

            v = _.trim(v);
            let vParts = v.split(' ');

            if (vParts.length === 1) {
                toReturn.date = new Date(vParts[0] + ' 00:00:00');

                if (!isFrom) {
                    toReturn.time.hours   = 23;
                    toReturn.time.minutes = 59;
                    toReturn.time.seconds = 59;
                }

            } else {
                toReturn.date = new Date(vParts[0] + ' 00:00:00');

                let timeParts = vParts[1].split(':');
                toReturn.time.hours   = parseInt(timeParts[0]);
                toReturn.time.minutes = parseInt(timeParts[1]);
                toReturn.time.seconds = parseInt(timeParts[2]);
            }

            return toReturn;
        },
        setRenderDates: function() {
            if (!_.isNull(this.selection.date1)) {
                this.render.calendar1.year = this.selection.date1.getFullYear();
                this.render.calendar1.month = this.selection.date1.getMonth();
            } else {
                this.render.calendar1.year  = this.today.getFullYear();
                this.render.calendar1.month = this.today.getMonth();
            }

            if (this.render.calendar1.month < 11) {
                this.render.calendar2.year  = this.render.calendar1.year;
                this.render.calendar2.month = this.render.calendar1.month + 1;
            } else {
                this.render.calendar2.year  = this.render.calendar1.year + 1;
                this.render.calendar2.month = 0;
            }
        },
        selectedDate: function(payload) {
            if (this.isRange) {
                if (
                    _.isNull(this.selection.date1) || //selection is cleared
                    (!_.isNull(this.selection.date1) && !_.isNull(this.selection.date2)) || //selection is completed
                    (!_.isNull(this.selection.date1)) && this.getSecondsSinceEpoch(this.selection.date1) > this.getSecondsSinceEpoch(payload.data) //date2 is before date1
                ) {
                    this.selection.date1 = payload.data;
                    this.selection.date2 = null;
                } else {
                    this.selection.date2 = payload.data;
                }
            } else {
                this.selection.date1 = payload.data;
            }
        },
        hoveredDate: function(payload) {
            this.hoverDate = payload.data;
        },
        changedTimePicker: function (payload) {
            if (payload.isFrom) {
                this.selection.time1 = payload.data;
            } else {
                this.selection.time2 = payload.data;
            }
        },
        changedRenderPeriod: function (payload) {
            if (payload.isFrom) {
                this.render.calendar1 = payload.data;

                if (this.render.calendar1.month < 11) {
                    this.render.calendar2.year  = this.render.calendar1.year;
                    this.render.calendar2.month = this.render.calendar1.month + 1;
                } else {
                    this.render.calendar2.year  = this.render.calendar1.year + 1;
                    this.render.calendar2.month = 0;
                }

            } else {
                this.render.calendar2 = payload.data;

                if (this.render.calendar2.month > 0) {
                    this.render.calendar1.year  = this.render.calendar2.year;
                    this.render.calendar1.month = this.render.calendar2.month - 1;
                } else {
                    this.render.calendar1.year  = this.render.calendar2.year - 1;
                    this.render.calendar1.month = 11;
                }
            }
        },
        initialize: function(v) {
            let data = this.parseRange(v);
            this.vModelDate = data.vModelDate;
            this.selection  = data.selection;
            this.setRenderDates();
        },
        apply: function() {
            this.vModelDate = this.finalSelection;

            this.$emit('input', this.vModelDate);

            let data = this.parseRange(this.vModelDate);
            this.setRenderDates();
            this.open = false;
        },
        cancel: function() {
            let data = this.parseRange(this.vModelDate);
            this.selection  = data.selection;
            this.hoverDate = null;
            this.setRenderDates();
        },
        clear: function () {
            this.vModelDate = '';
            this.selection = _.clone(_.get(this.clearData, 'selection'));
            this.hoverDate = null;
            this.open = false;
        },
        setRange: function(range) {
            let rangeString = this.getDateStringWithTime(range.start) + ' - ' +this.getDateStringWithTime(range.end);
            let data = this.parseRange(rangeString);
            this.selection  = data.selection;
            this.hoverDate = null;
            this.setRenderDates();
        },
        doHide(event) {
            if (!(this.$el == event.target || this.$el.contains(event.target))) {
                this.open = false;
            }
        },
    }
}
</script>