import Datepicker from "./components/Datepicker";

export default {
    install(Vue, options) {
        // Let's register our component globally
        Vue.component("datepicker", Datepicker);
    }
};