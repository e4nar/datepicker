import Vue from 'vue'
import Datepicker from "./components/Datepicker";

import './assets/scss/app.scss'

export default {
    install(Vue, options) {
        // Let's register our component globally
        Vue.component("datepicker", Datepicker);
    }
};