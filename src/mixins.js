export default {
    computed: {

    },
    methods: {
        getSecondsSinceEpoch: function (d){
            if (_.isNull(d)) {
                return 0;
            }
            return Math.floor( d / 1000 );
        },
        putZeroPad: function (v){
            return (v < 10 ? '0' : '') + v.toString();
        },
        getDateString: function(date) {
            if (_.isNull(date)) {
                return '';
            }
            return date.getFullYear() +  '-' + this.putZeroPad(date.getMonth()+1) + '-' + this.putZeroPad(date.getDate());
        },
        getDateStringWithTime: function(date) {
            if (_.isNull(date)) {
                return '';
            }
            return date.getFullYear() +  '-' + this.putZeroPad(date.getMonth()+1) + '-' + this.putZeroPad(date.getDate()) +
                ' ' + this.putZeroPad(date.getHours()) + ':' + this.putZeroPad(date.getMinutes()) + ':' + this.putZeroPad(date.getSeconds());
        },
        getTimeString: function(time) {
            if (_.isNull(time)) {
                return '';
            }
            return this.putZeroPad(time.hours) +  ':' + this.putZeroPad(time.minutes) + ':' + this.putZeroPad(time.seconds);
        },
        getMonths: function() {
            return [
                {value: 0, text: 'Jan'},
                {value: 1, text: 'Feb'},
                {value: 2, text: 'Mar'},
                {value: 3, text: 'Apr'},
                {value: 4, text: 'May'},
                {value: 5, text: 'Jun'},
                {value: 6, text: 'Jul'},
                {value: 7, text: 'Aug'},
                {value: 8, text: 'Sep'},
                {value: 9, text: 'Oct'},
                {value: 10, text: 'Nov'},
                {value: 11, text: 'Dec'},
            ];
        },
        getDays: function() {
            return [
                {value: 0, text: 'Sun'},
                {value: 1, text: 'Mon'},
                {value: 2, text: 'Tue'},
                {value: 3, text: 'Wed'},
                {value: 4, text: 'Thu'},
                {value: 5, text: 'Fri'},
                {value: 6, text: 'Sat'},
            ];
        }
    }
}