<template>
    <div class="container">
        <p>Simple Datepicker</p>
        <b-row>
            <b-col>
                <b-form-group id="fieldset-1" label="No default value">
                    <datepicker
                        v-model="example1a.date"
                        :is-range="example1a.isRange"
                        :display-icon="example1a.displayIcon"
                        :display-preview="example1a.displayPreview"
                        :display-time="example1a.displayTime"
                        :disabled-dates="example1a.disabledDates"
                        :disabled-month-dates="example1a.disabledMonthDates"
                        :disabled-week-days="example1a.disabledWeekDays"
                        :min-date="example1a.minDate"
                        :max-date="example1a.maxDate"
                    ></datepicker>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group id="fieldset-2" label="With default value">
                    <datepicker
                        v-model="example1b.date"
                        :is-range="example1b.isRange"
                        :display-icon="example1b.displayIcon"
                        :display-preview="example1b.displayPreview"
                        :display-time="example1b.displayTime"
                        :disabled-dates="example1b.disabledDates"
                        :disabled-month-dates="example1b.disabledMonthDates"
                        :disabled-week-days="example1b.disabledWeekDays"
                        :min-date="example1b.minDate"
                        :max-date="example1b.maxDate"
                    ></datepicker>
                </b-form-group>
            </b-col>
        </b-row>

        <p class="mt-5">Simple DateTime picker</p>
        <b-row>
            <b-col>
                <b-form-group id="fieldset-1" label="No default value">
                    <datepicker
                        v-model="example2a.date"
                        :is-range="example2a.isRange"
                        :display-icon="example2a.displayIcon"
                        :display-preview="example2a.displayPreview"
                        :display-time="example2a.displayTime"
                        :disabled-dates="example2a.disabledDates"
                        :disabled-month-dates="example2a.disabledMonthDates"
                        :disabled-week-days="example2a.disabledWeekDays"
                        :min-date="example2a.minDate"
                        :max-date="example2a.maxDate"
                    ></datepicker>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group id="fieldset-2" label="With default value">
                    <datepicker
                        v-model="example2b.date"
                        :is-range="example2b.isRange"
                        :display-icon="example2b.displayIcon"
                        :display-preview="example2b.displayPreview"
                        :display-time="example2b.displayTime"
                        :disabled-dates="example2b.disabledDates"
                        :disabled-month-dates="example2b.disabledMonthDates"
                        :disabled-week-days="example2b.disabledWeekDays"
                        :min-date="example2b.minDate"
                        :max-date="example2b.maxDate"
                    ></datepicker>
                </b-form-group>
            </b-col>
        </b-row>

        <p class="mt-5">Range Datepicker</p>
        <b-row>
            <b-col>
                <b-form-group id="fieldset-1" label="No default value">
                    <datepicker
                        v-model="example3a.date"
                        :is-range="example3a.isRange"
                        :display-icon="example3a.displayIcon"
                        :display-preview="example3a.displayPreview"
                        :display-time="example3a.displayTime"
                        :disabled-dates="example3a.disabledDates"
                        :disabled-month-dates="example3a.disabledMonthDates"
                        :disabled-week-days="example3a.disabledWeekDays"
                        :min-date="example3a.minDate"
                        :max-date="example3a.maxDate"
                    ></datepicker>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group id="fieldset-2" label="With default value">
                    <datepicker
                        v-model="example3b.date"
                        :is-range="example3b.isRange"
                        :display-icon="example3b.displayIcon"
                        :display-preview="example3b.displayPreview"
                        :display-time="example3b.displayTime"
                        :disabled-dates="example3b.disabledDates"
                        :disabled-month-dates="example3b.disabledMonthDates"
                        :disabled-week-days="example3b.disabledWeekDays"
                        :min-date="example3b.minDate"
                        :max-date="example3b.maxDate"
                    ></datepicker>
                </b-form-group>
            </b-col>
        </b-row>

        <p class="mt-5">Range DateTime picker</p>
        <b-row>
            <b-col>
                <b-form-group id="fieldset-1" label="No default value">
                    <datepicker
                        v-model="example4a.date"
                        :is-range="example4a.isRange"
                        :display-icon="example4a.displayIcon"
                        :display-preview="example4a.displayPreview"
                        :display-time="example4a.displayTime"
                        :disabled-dates="example4a.disabledDates"
                        :disabled-month-dates="example4a.disabledMonthDates"
                        :disabled-week-days="example4a.disabledWeekDays"
                        :min-date="example4a.minDate"
                        :max-date="example4a.maxDate"
                    ></datepicker>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group id="fieldset-2" label="With default value">
                    <datepicker
                        v-model="example4b.date"
                        :is-range="example4b.isRange"
                        :display-icon="example4b.displayIcon"
                        :display-preview="example4b.displayPreview"
                        :display-time="example4b.displayTime"
                        :disabled-dates="example4b.disabledDates"
                        :disabled-month-dates="example4b.disabledMonthDates"
                        :disabled-week-days="example4b.disabledWeekDays"
                        :min-date="example4b.minDate"
                        :max-date="example4b.maxDate"
                    ></datepicker>
                </b-form-group>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import Datepicker from "@/components/Datepicker";

export default {
    name: 'App',
    components: {
        Datepicker
    },
    data() {
        return {
            //simple datepicker
            example1a: {
                disabledDates: [],
                disabledMonthDates: [],
                disabledWeekDays: [],
                minDate: null,
                maxDate: null,
                isRange: false,
                displayTime: false,
                date: null,
                displayIcon: true,
                displayPreview: true,
            },
            example1b: {
                disabledDates: [],
                disabledMonthDates: [],
                disabledWeekDays: [],
                minDate: null,
                maxDate: null,
                isRange: false,
                displayTime: false,
                date: '2021-04-25',
                displayIcon: true,
                displayPreview: true,
            },

            //simple datetimepicker
            example2a: {
                disabledDates: [],
                disabledMonthDates: [],
                disabledWeekDays: [],
                minDate: null,
                maxDate: null,
                isRange: false,
                displayTime: true,
                date: null,
                displayIcon: true,
                displayPreview: true,
            },
            example2b: {
                disabledDates: [],
                disabledMonthDates: [],
                disabledWeekDays: [],
                minDate: null,
                maxDate: null,
                isRange: false,
                displayTime: true,
                date: '2021-04-25 12:00:00',
                displayIcon: true,
                displayPreview: true,
            },

            //range datepicker
            example3a: {
                disabledDates: [],
                disabledMonthDates: [],
                disabledWeekDays: [],
                minDate: null,
                maxDate: null,
                isRange: true,
                displayTime: false,
                date: null,
                displayIcon: true,
                displayPreview: true,
            },
            example3b: {
                disabledDates: [],
                disabledMonthDates: [],
                disabledWeekDays: [],
                minDate: null,
                maxDate: null,
                isRange: true,
                displayTime: false,
                date: '2021-04-25 - 2021-05-15',
                displayIcon: true,
                displayPreview: true,
            },

            //range datetimepicker
            example4a: {
                disabledDates: [],
                disabledMonthDates: [],
                disabledWeekDays: [],
                minDate: null,
                maxDate: null,
                isRange: true,
                displayTime: true,
                date: null,
                displayIcon: true,
                displayPreview: true,
            },
            example4b: {
                disabledDates: [],
                disabledMonthDates: [],
                disabledWeekDays: [],
                minDate: null,
                maxDate: null,
                isRange: true,
                displayTime: true,
                date: '2021-04-25 00:00:00 - 2021-05-15 23:59:59',
                displayIcon: true,
                displayPreview: true,
            },
        };
    }
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
.container {
    padding-top:100px!important;
}
</style>
