import Datepicker from "./components/Datepicker.vue";
import './assets/scss/app.scss'

function install(Vue){
    Vue.component("datepicker", Datepicker);
}
export {
    Datepicker,
    install
};

export default Datepicker;