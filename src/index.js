import Vue from 'vue';

import Datepicker from './components/Datepicker.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import _ from 'lodash';

import './assets/scss/app.scss'
//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.component('datepicker', Datepicker);

export default Datepicker;