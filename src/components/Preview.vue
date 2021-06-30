<template>
    <div class="preview">
        <template v-if="date1 !== '' || date2 !== ''">
            <div class="calendar-selection" v-if="date1 !== ''">
                <div class="date" >{{ date1 }}</div>
                <div class="time" v-if="displayTime">{{ time1 }}</div>
            </div>
            <div class="separator" v-if="isRange"> - </div>
            <div class="calendar-selection" v-if="date2 !== '' && isRange">
                <div class="date">{{ date2 }}</div>
                <div class="time" v-if="displayTime">{{ time2 }}</div>
            </div>
        </template>

        <template v-else>
            <span class="placeholder">Select Date</span>
        </template>
    </div>
</template>

<script>
import myMixins from "../mixins";

export default {
    name: "Preview",
    mixins: [
        myMixins
    ],
    props: {
        selection: {
            type: Object,
            required: true
        },
        displayTime: {
            type: Boolean,
            default: false
        },
        isRange: {
            type: Boolean,
            default: false
        },
    },
    mounted() {
        this.handleSelection();
    },
    data() {
        return {
            date1: '',
            date2: '',
            time1: '',
            time2: '',
        }
    },
    watch: {
        selection: {
            deep: true,
            handler: function(v) {
                this.handleSelection();
            }
        }
    },
    methods:  {
        handleSelection: function() {
            this.date1 = this.getFormattedDate(this.selection.date1);
            this.date2 = this.getFormattedDate(this.selection.date2);
            this.time1 = this.getTimeString(this.selection.time1);
            this.time2 = this.getTimeString(this.selection.time2);
        },
        getFormattedDate: function (date) {
            if (_.isNull(date)) {
                return '';
            }
            let toReturn = '';

            let dayString = _.get(_.find(this.getDays(), (d) => {
                return d.value === date.getDay();
            }), 'text');
            let monthString = _.get(_.find(this.getMonths(), (d) => {
                return d.value === date.getMonth();
            }), 'text');

            toReturn = dayString + ', ' + date.getDate() + ' ' + monthString + ' ' + date.getFullYear();

            return toReturn;
        }
    }
}
</script>