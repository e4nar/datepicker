import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'

Vue.config.productionTip = false
import './assets/scss/app.scss'

import _ from 'lodash';

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
    render: function (h) { return h(App) },
}).$mount('#app')
