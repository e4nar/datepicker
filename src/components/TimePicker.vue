<template>
    <div class="timepicker">
        <b-form-select
            class="select-hours"
            v-model="hours"
            :options="options.hours"
            size="sm"
        ></b-form-select>
        <b-form-select
            class="select-minutes"
            v-model="minutes"
            :options="options.minutes"
            size="sm"
        ></b-form-select>
        <b-form-select
            class="select-seconds"
            v-model="seconds"
            :options="options.seconds"
            size="sm"
        ></b-form-select>
    </div>
</template>

<script>
export default {
    name: "TimePicker",
    props: {
        isFrom: {
            type: Boolean,
            default: true
        },
        selection: {
            type: Object,
            required: true
        },
    },
    created() {
        this.init();
    },
    data() {
        return {
            hours: 0,
            minutes: 0,
            seconds: 0,
        }
    },
    computed: {
        options: function () {
            let toReturn = {
                hours: [],
                minutes: [],
                seconds: [],
            };

            for (let i = 0; i <= 24; i++) {
                toReturn.hours.push({
                    value: i,
                    text: this.putZeroPad(i),
                });
            }
            for (let i = 0; i <= 60; i++) {
                toReturn.minutes.push({
                    value: i,
                    text: this.putZeroPad(i),
                });
                toReturn.seconds.push({
                    value: i,
                    text: this.putZeroPad(i),
                });
            }

            return toReturn;
        },
        time: function() {
            return this.putZeroPad(this.hours) + ':' + this.putZeroPad(this.minutes) + ':' + this.putZeroPad(this.seconds);
        }
    },
    watch: {
        selection: {
            deep: true,
            handler: function () {
                this.init();
            }
        },
        time: function(n, o) {
            this.$emit('time-picker-change', {
                isFrom: this.isFrom,
                data: {
                    hours: this.hours,
                    minutes: this.minutes,
                    seconds: this.seconds
                }
            });
        }
    },
    methods: {
        putZeroPad: function (v){
            return (v < 10 ? '0' : '') + v.toString();
        },
        init: function () {
            if (this.isFrom) {
                this.hours = this.selection.time1.hours;
                this.minutes = this.selection.time1.minutes;
                this.seconds = this.selection.time1.seconds;
            } else {
                this.hours = this.selection.time2.hours;
                this.minutes = this.selection.time2.minutes;
                this.seconds = this.selection.time2.seconds;
            }
        }
    }
}
</script>